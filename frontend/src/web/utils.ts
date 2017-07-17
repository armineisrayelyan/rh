export class UTILS {
    static normalizeText(str):string{
        if (str.length > 24){
            return `${str.slice(0,21)}...`
        }
        return str;
    }
}