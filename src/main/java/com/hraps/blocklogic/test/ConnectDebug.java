package com.hraps.blocklogic.test;
import java.io.*;//包含输入流类和输出流类
import java.net.*;//提供支持网络功能的类

public class ConnectDebug {
    public static void main(String[] args) {
        try {
            String modifiedSentence;
            Socket clientSocket=new Socket("192.168.1.147",9317);
            System.out.println("Connect success!");
            DataOutputStream outToServer= new DataOutputStream(clientSocket.getOutputStream());
            DataInputStream inFromServer=new DataInputStream(clientSocket.getInputStream());

            int length = inFromServer.readInt();
            int type = inFromServer.readInt();
            byte[] b = new byte[length];
            inFromServer.read(b);
            modifiedSentence = new String(b);
            System.out.println("From server: "+modifiedSentence);

            String msg = "{\"type\": \"hello\",\"data\": {\"client_version\": 3}}";
            byte[] msgBytes = msg.getBytes();
            outToServer.writeInt(msgBytes.length);
            outToServer.writeInt(1);
            outToServer.write(msgBytes);
            outToServer.flush();

        }catch (Exception e){
            e.printStackTrace();
        }
    }
    public static byte[] intToByteArray(int i) {
        byte[] result = new byte[4];
        result[0] = (byte)((i >> 24) & 0xFF);
        result[1] = (byte)((i >> 16) & 0xFF);
        result[2] = (byte)((i >> 8) & 0xFF);
        result[3] = (byte)(i & 0xFF);
        return result;
    }
}

