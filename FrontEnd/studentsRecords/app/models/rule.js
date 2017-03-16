import DS from 'ember-data';

export default DS.Model.extend({
    description: DS.attr(),
    logExpressions: DS.hasMany("logExpress"),
    assessmentCode: DS.belongsTo("assessmentCode")
});