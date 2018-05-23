/**
 * Created by i99208 on 2017. 3. 2..
 */



const trim = (obj)=> {
    return obj.replace(/(^\s*)|(\s*$)/gi, "");
}

// const sqlLikeParam = (obj)=>{
//     return obj.replace(/[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9)]/gi,"");
// }

const escape = (obj)=>{
    /*

     Escape Sequence	Character Represented by Sequence
     \0	An ASCII NUL (X'00') character
     \'	A single quote (') character
     \"	A double quote (") character
     \b	A backspace character
     \n	A newline (linefeed) character
     \r	A carriage return character
     \t	A tab character
     \Z	ASCII 26 (Control+Z); see note following the table
     \\	A backslash (\) character
     \%	A % character; see note following the table
     \_	A _ character; see note following the table
     */
    return obj.replace(/[(\%)]/gi,'\\%')
              .replace(/[(\_)]/gi,'\\_')
              //.replace(/[(\')]/gi,"\\'")
              //.replace(/[(\")]/gi,'\\"')
              //.replace(/[(\b)]/gi,'\\b')
              //.replace(/[(\n)]/gi,'\\n')
              //.replace(/[(\r)]/gi,'\\r')
              //.replace(/[(\t)]/gi,'\\t')
              //.replace(/[(\0)]/gi,'\\0')
              //.replace(/[(\Z)]/gi,'\\Z')
              //.replace(/[(\\)]/gi,"\\")


}


module.exports = {
    trim,
    escape,
}
