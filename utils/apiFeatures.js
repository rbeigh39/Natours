class APIFeatures {
   constructor(query, queryObject) {
      this.query = query;
      this.queryObject = queryObject;
   }

   filter() {
      // 1.A) Filtering
      const queryObj = { ...this.queryObject };
      const excludedFields = ['page', 'sort', 'limit', 'fields'];

      excludedFields.forEach(cur => delete queryObj[cur]); // Remove all of the fields in the excludedFields array that exist in queryObj

      // 1.B) Advanced Filtering
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

      // Build the query
      this.query = this.query.find(JSON.parse(queryStr));
      // this.query = this.query.find({ duration: ['5', '9'] });

      return this;
   }

   sort() {
      if (this.queryObject.sort) {
         const sortBy = this.queryObject.sort.split(',').join(' ');
         this.query = this.query.sort(sortBy);
      } else {
         this.query = this.query.sort('-createdAt'); // to allow the newly created tours to appear first
      }

      return this;
   }

   limitFields() {
      if (this.queryObject.fields) {
         const fields = this.queryObject.fields.split(',').join(' ');
         this.query = this.query.select(fields);
      } else {
         this.query = this.query.select('-__v');
      }

      return this;
   }

   paginate() {
      const page = this.queryObject.page * 1 || 1;
      const limit = this.queryObject.limit * 1 || 100;
      const skip = (page - 1) * limit;

      this.query = this.query.skip(skip).limit(limit);

      return this;
   }
}

module.exports = APIFeatures;
