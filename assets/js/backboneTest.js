/*
var Todo = Backbone.Model.extend({
 defaults: {
    title: '',
    completed: false
 },
 initialize: function(){
    console.log('Todo Model has been initialized');
    this.on('change',function(){
        console.log('- Values for the Todo Model have changed');
    })
 }
});

var myTodo = new Todo({
    title: 'check attributes property of the logged models in the console'
});

var TodoView = Backbone.View.extend({
    tagName: 'li',

    //Cache the template function for a single item
    todoTpl:  _.template($('#item-template').html()),

    events: {
        'dblclick label': 'edit',
        'keypress .edit': 'updateOnEnter',
        'blur .edit': 'close'
    },

    initialize: function(){
        this.$el = $('#todo');
    },

    render: function(){
        this.$el.html(this.todoTpl(this.model.toJSON()));
        this.input = this.$('.edit');
        return this;
    },

    edit: function(){

    },

    close: function(){

    },

    updateOnEnter: function(){

    }
});

var todoView = new TodoView({model: myTodo});
*/
var Person = Backbone.Model.extend({
        defaults: {
            name: 'emptyDIV'
        },
        initialize: function(){
            console.log('Person has been initiallized')
        }

    });
var PersonList = Backbone.Collection.extend({
      model : Person,
      nextOrder : function(){
        if (!this.length) return 1;
        return this.last().get('id') + 1;
    },
    initialize: function(){
        this.on('add',function(){
            console.log('add another obj')
        });
    }
});

var personList =new PersonList();


var ContentView = Backbone.View.extend({
    initialize: function(){
        //alert('contentView has been initialized');
        this.listenTo(personList,'add', this.resetAll)
        this.container = this.$(".J_content");

    },
    el: $('#J_container'),

    template: _.template($('#item-template').html()),
    
    render: function(){
        this.$el.html(this.template);
    },
/*
    render: function(){
        var template = _.template($('#item-template').html());
        $(this.el).html(template);

    },
*/
    events: {
        'click #J_add': 'doAdd',
        'click .show': 'showAlert'

    },
    doAdd: function(){
        var person =new Person();
        personList.add(person);
    },
    addOne: function(model){
        this.container.append(this.template(model.toJSON()));
    },
    resetAll: function(){
        var self = this
        this.container.html("");
        _.each(personList.models,function(item){
          self.container.append(self.template(item.toJSON()));
        }) 
    },
    showAlert: function(e){
        console.log($(e.currentTarget)[0])
    }
});

view =new ContentView();


