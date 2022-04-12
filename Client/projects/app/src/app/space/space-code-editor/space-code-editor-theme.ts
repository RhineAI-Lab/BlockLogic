
export class CodeEditorTheme{
  static MyOneDark: any = {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: '', foreground: 'facc72', background: '1E1E1E' },
      { token: 'invalid', foreground: 'f44747' },
      { token: 'emphasis', fontStyle: 'italic' },
      { token: 'strong', fontStyle: 'bold' },

      { token: 'variable', foreground: '74B0DF' },
      { token: 'variable.predefined', foreground: '4864AA' },
      { token: 'variable.parameter', foreground: '9CDCFE' },
      { token: 'constant', foreground: '569CD6' },
      { token: 'comment', foreground: '608B4E' },
      { token: 'number', foreground: 'a0ce88' },
      { token: 'number.hex', foreground: '4db695' },
      { token: 'regexp', foreground: 'ec7033' },
      { token: 'annotation', foreground: 'cc6666' },
      { token: 'type', foreground: '3DC9B0' },

      { token: 'delimiter', foreground: 'DCDCDC' },
      { token: 'delimiter.html', foreground: '808080' },
      { token: 'delimiter.xml', foreground: '808080' },

      { token: 'tag', foreground: '569CD6' },
      { token: 'tag.id.pug', foreground: '4F76AC' },
      { token: 'tag.class.pug', foreground: '4F76AC' },
      { token: 'meta.scss', foreground: 'A79873' },
      { token: 'meta.tag', foreground: 'CE9178' },
      { token: 'metatag', foreground: 'DD6A6F' },
      { token: 'metatag.content.html', foreground: '9CDCFE' },
      { token: 'metatag.html', foreground: '569CD6' },
      { token: 'metatag.xml', foreground: '569CD6' },
      { token: 'metatag.php', fontStyle: 'bold' },

      { token: 'key', foreground: '9CDCFE' },
      { token: 'string.key.json', foreground: '9CDCFE' },
      { token: 'string.value.json', foreground: 'CE9178' },

      { token: 'attribute.name', foreground: '9CDCFE' },
      { token: 'attribute.value', foreground: 'CE9178' },
      { token: 'attribute.value.number.css', foreground: 'B5CEA8' },
      { token: 'attribute.value.unit.css', foreground: 'B5CEA8' },
      { token: 'attribute.value.hex.css', foreground: 'D4D4D4' },

      { token: 'string', foreground: '58d2e1' },
      { token: 'string.sql', foreground: 'ee2222' },

      { token: 'keyword', foreground: 'C678DD' },
      { token: 'keyword.flow', foreground: 'C586C0' },
      { token: 'keyword.json', foreground: 'CE9178' },
      { token: 'keyword.flow.scss', foreground: '569CD6' },

      { token: 'operator.scss', foreground: '909090' },
      { token: 'operator.sql', foreground: '778899' },
      { token: 'operator.swift', foreground: '909090' },
      { token: 'predefined.sql', foreground: 'FF00FF' },
    ],
    colors: {
      'editor.background': '#1E1E1E',
      'editor.foreground': '#D4D4D4',
      'editor.inactiveSelection': '#3A3D41',
      'editor.indentGuides': '#404040',
      'editor.activeIndentGuides': '#707070',
      'editor.selectionHighlight': '#ADD6FF26',
    }
  };
}