import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  showAllStudents: false,
  residencyModel: null,
  selectedResidency: null,
  selectedGender: null,
  selectedDate: null,
  studentsRecords: null,
  currentStudent: null,
  currentIndex: null,
  firstIndex: 0,
  lastIndex: 0,
  finalIndex: 99,
  studentPhoto: null,
  limit: null,
  offset: null,
  pageSize: null,
  movingBackword: false,
  showHelpPage: false,
  showFindRecordPage: false,

  studentModel: Ember.observer('offset', function () {
    var self = this;
    this.get('store').query('student', {
      limit: self.get('limit'),
      offset: self.get('offset')
    }).then(function (records) {
      self.set('studentsRecords', records);
      self.set('firstIndex', records.indexOf(records.get("firstObject")));
      self.set('lastIndex', records.indexOf(records.get("lastObject")));
      if (self.get('movingBackword')) {
        self.set('currentIndex', records.indexOf(records.get("lastObject")));
      } else {
        self.set('currentIndex', records.indexOf(records.get("firstObject")));
      }
    });
  }),

  fetchStudent: Ember.observer('currentIndex', function () {
    this.showStudentData(this.get('currentIndex'));
  }),

  init() {
    this._super(...arguments);
    // load Residency data model
    this.get('store').findAll('residency').then(function (records) {
      self.set('residencyModel', records);
    });

    // load first page of the students records
    this.set('limit', 10);
    this.set('offset', 0);
    this.set('pageSize', 10);
    this.set('finalIndex', 99);
    var self = this;
    this.get('store').query('student', {
      limit: self.get('limit'),
      offset: self.get('offset')
    }).then(function (records) {
      self.set('studentsRecords', records);
      self.set('firstIndex', records.indexOf(records.get("firstObject")));
      self.set('lastIndex', records.indexOf(records.get("lastObject")));

      // Show first student data
      self.set('currentIndex', self.get('firstIndex'));
    });
  },

  showStudentData: function (index) {
    this.set('currentStudent', this.get('studentsRecords').objectAt(index));
    //this.set('studentPhoto', this.get('currentStudent').get('photo'));
    if(this.get('currentStudent').get('gender')==1){
      this.set('studentPhoto', "/assets/studentsPhotos/male.png");
    }
    else{
      this.set('studentPhoto', "/assets/studentsPhotos/female.png");
    }
    var date = this.get('currentStudent').get('DOB');
    var datestring = date.toISOString().substring(0, 10);
    this.set('selectedDate', datestring);
  },

  didRender() {
    Ember.$('.menu .item').tab();
  },


  actions: {
    saveStudent () {
      var updatedStudent = this.get('currentStudent');
      var res = this.get('store').peekRecord('residency', this.get('selectedResidency'));
      updatedStudent.set('gender', this.get('selectedGender'));
      updatedStudent.set('DOB', new Date(this.get('selectedDate')));
      updatedStudent.set('resInfo', res);
      updatedStudent.save().then(() => {
        //     this.set('isStudentFormEditing', false);
      });

      if(this.get('currentStudent').get('gender')==1){
        this.set('studentPhoto', "/assets/studentsPhotos/male.png");
      }
      else{
        this.set('studentPhoto', "/assets/studentsPhotos/female.png");
      }
    },

    firstStudent() {
      this.set('currentIndex', this.get('firstIndex'));
      //this.set('currentIndex', this.get('indexFirstDb'));
    },

    nextStudent() {
      this.set('movingBackword' , false);
      console.log(this.get('finalIndex') + " " + this.get('currentIndex'));
       if (this.get('currentIndex') < this.get('lastIndex')) {
         this.set('currentIndex', this.get('currentIndex') + 1);
          //     console.log(JSON.stringify(this.get('currentStudent')));
       }
        else {
          if(this.get('offset') <= 80){
            this.set('offset', this.get('offset') + this.get('pageSize'));
          }
        }
    },

    previousStudent() {
      this.set('movingBackword' , true);
      if (this.get('currentIndex') > 0) {
        this.set('currentIndex', this.get('currentIndex') - 1);
      }
      else if (this.get('offset') > 0) {
        this.set('offset', this.get('offset') - this.get('pageSize'));
      }
    },

    lastStudent() {
      this.set('currentIndex', this.get('lastIndex'));
      //this.set('currentIndex', this.get('indexLastDb'));
    },

    allStudents() {
      this.set('showAllStudents', true);
    },

    selectGender (gender){
      console.log(gender);
      this.set('selectedGender', gender);

    },

    selectResidency (residency){
      this.set('selectedResidency', residency);
    },

    assignDate (date){
      this.set('selectedDate', date);
    },

    help(){
      this.set('showHelpPage', true);
    },

    findStudent(){
      this.set('showFindRecordPage', true);
    },

    delete(id) {
      var nextIndex = 0;
      if (this.get('currentIndex') < this.get('lastIndex')) {
        nextIndex = this.get('currentIndex') + 1;
      }
      else {
        nextIndex = this.get('currentIndex') - 1;
      }

      if (confirm("Press OK to Confirm Delete") === true) {
        var myStore = this.get('store');
        myStore.findRecord('student', id).then(function (student) {
          student.destroyRecord();
        });
        this.set('currentIndex', nextIndex);
      }

    },
  }
});
