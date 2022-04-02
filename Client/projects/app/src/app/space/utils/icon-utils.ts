

export class IconUtils {

    static getIconByFileName(name: string): string {
        let nameSp = name.split('.')
        let nameLast = nameSp[nameSp.length-1]
        let hadList = 'java js jsx ts tsx html xhtml xml css xsd yaml properties python gql'.split(' ')
        let zipList = 'zip rar 7z'.split(' ')
        let picList = 'jpg png jpeg ico logo bmp'.split(' ')
        if(name=='project.json'){
            return 'icon-file-config'
        }else if(hadList.indexOf(nameLast)>-1){
            return 'icon-file-'+nameLast
        }else if(zipList.indexOf(nameLast)>-1){
            return 'icon-file-archive'
        }else if(picList.indexOf(nameLast)>-1){
            return 'icon-file-pic'
        }else if(nameSp.length==1){
            return 'icon-file-unknown'
        }else{
            return 'icon-file-text'
        }
    }

}