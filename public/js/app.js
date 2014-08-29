App = Ember.Application.create();
App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.Router.map(function () {
  this.resource('barcharts', function () {
    this.resource('barchart', {path: ':barchart_id'});
  });
  this.resource('newBarchart', {path: 'new-barchart'}, function () {
  });
});

App.BarchartsRoute = Ember.Route.extend({
  model: function () {
    return this.store.find('barchart');
    //return barcharts;
  }
});

App.BarchartRoute = Ember.Route.extend({
  model: function (params) {
    return this.store.find('barchart', params.barchart_id);
  }
});

App.BarchartController = Ember.ObjectController.extend({
  isEditing: false, 
  actions: {
    edit: function () {
      this.set('isEditing', true);
    },
    save: function () {
      this.set('isEditing', false);
    },
  },
});



App.NewBarchartRoute = Ember.Route.extend({
  model: function () {
    return {
      name: '',
      dataStringX: '',
      rangeMin: 0,
      rangeMax: 100
    };
  }
});

App.NewBarchartController = Ember.ObjectController.extend({
  isEditingName: true, 
  actions: {
    editName: function () {
      this.set('isEditingName', true);
    },
    saveName: function () {
      this.set('isEditingName', false);
    },
    saveChart: function () {
    }
  }
});


App.Barchart = DS.Model.extend({
  name: DS.attr('string'),
  data: DS.attr('array')
});

App.Barchart.FIXTURES = [
  {
    id: '1',
    name: 'barchart 01',
    data: [4,3,5,6,3,6]
  },
  {
    id: '2',
    name: 'barchart 02',
    data: [4,5,6,7,5,34,6]
  },
];

App.ChartBarchartComponent = Ember.Component.extend({
  classNames: ['barchart'],
  operators: [],
  operands: [],
  displayReady: true,
  tagName: 'svg',
  chartdata: null,
  setup: function () {
    var $ = this.$();
    //console.log($);
    var arr = [];
    this.get('data').map(function (item) {
      arr.push({x: item, M: 0});
    });
    this.set('chartData', arr);
  }.on('didInsertElement'),
  teardown: function () {
  }.on('willDestroyElement'),

});

//.helper is for single line helpers
//.registerHelper is for block helpers
Ember.Handlebars.registerHelper('bars', function (args) {
  var data = this.get('data')
    , elementHeight = args.hash.height
    , openSvg = '<svg>'
    , closeSvg = '<svg>'
    , rects = [];

  for (var i = 0; i < data.length; i += 1) {
    var width = 30
      , height = data[i] * 10
      , hPosition = (i * 40)
      , vPosition = elementHeight - height
      ;

    rects.push('<rect class="bar" x="'+ hPosition +'" width="' + width +'" y="'+ vPosition +'" height="'+ height +'"></rect>');
  }

  element = openSvg + rects.join('\n') + closeSvg;
  return new Ember.Handlebars.SafeString(element);
});
