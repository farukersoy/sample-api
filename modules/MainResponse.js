class MainResponse {

    constructor(status, desc, result){
        this._status = status || false;
        this._desc = desc || "";
        this._result = result || null;
    }

    set status(st) {
        this._status = st
    }
    set desc(de) {
        this._desc = de
    }
    set result(res) {
        this._result = res
    }

    setResponse(status, desc, result){
        this._status = status
        this._desc = desc
        this._result = result 
    }

    getResponse(){
        const status = this._status
        const desc = this._desc
        const result = this._result
        return {status, desc, ...(result) && {"result": result}}
    }

    getStatus(){
        const status = this._status
        return status
    }
}

module.exports = MainResponse