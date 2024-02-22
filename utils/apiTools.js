class APIFeatures{
    constructor(query,queryString){
        this.query=query;
        this.queryString=queryString;
    }
    filter(){
        // Paduodama uzklausa
        const queryObj={...this.queryString}
        // Pasalina dalykus kuriu neturim implamentave
        const excludedFields=['page','sort','limit','fields'];
        excludedFields.forEach((el)=>{delete queryObj[el]});
        // $ zenklo pridejimas i uzklausa
        let queryStr=JSON.stringify(queryObj);
        queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`)
        // Atiduoda failus kuriuos turim implamentave
        this.query=this.query.find(JSON.parse(queryStr));
        return this;
    }
    sort(){
        if(this.queryString.sort){
            const sortBy=this.queryString.sort.split(',').join(' ');
            this.query=this.query.sort(sortBy) // Sortina pagal uzklausa(sort[room_price])
        }else{
            this.query=this.query.sort('createdAt') // Sortina tiesiog pagal sukurimo laika
        }
        return this;
    }
    limitFields(){
        // Displayinimo limitas kiek informacijos turetu isvesti
        if(this.queryString.fields){
            const fields=this.queryString.fields.split(',').join(' ');
            this.query=this.query.select(fields);
        }else{
            this.query=this.query.select('-__v');
        }
        return this;
    }
    paginate(){
        const page=this.queryString.page*1 || 1;
        const limit=this.queryString.limit*1 || 100;
        const skip=(page-1)*limit;
        this.query=this.query.skip(skip).limit(limit)
        return this;
    }
}

module.exports=APIFeatures