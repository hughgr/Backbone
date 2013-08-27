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
        'dblclick label' : 'edit',
        'keypress .edit' : 'updateOnEnter',
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
