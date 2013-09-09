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
$.ajaxSetup({
        url: 'newData.json',
        dataType: 'json',
        traditional: true,
        error: function(){alert('请求异常，请重试')
    }
})
var fetchData = function(callBack,arg1){
    $.ajax({
            type: 'get',
            success: callBack
        })
};
var delData = function(model,callBack){
    $.ajax({
            type: 'post',
            data: model,
            success: callBack
        })
};
var saveData = function(model,callBack){
    $.ajax({
            type: 'post',
            data: model,
            success: callBack
        })

};

var modifyData = function(model,callBack){
    $.ajax({
            url: 'modifyData.json',
            type: 'post',
            data: model,
            success: callBack
        })

};
/*Backbone.sync = function(method , model){
    alert(method + ':' + model.url);
    personList.add(model)
}*/

$(function(){

var Person = Backbone.Model.extend({
        defaults: function(){
            return {
            name: 'emptyDIV',
            status: [
                {health: 'ok'},
                {health: 'bad'},
                {health: 'soso'}
            ],
            date:'2012-01-06',
            homeWork: 'emptyHomeWork'
        };
            
        },
        url: 'newData.json',
        initialize: function(){
            console.log('Person has been initiallized')
        },

    });
var PersonList = Backbone.Collection.extend({
      model : Person,
      url: 'newData.json',
      nextOrder : function(){
        if (!this.length) return 1;
        return this.last().get('order') + 1;
    },
    comparator: function(person){
        return - new Date(person.get('date')).getTime();
    },
    initialize: function(){
        this.on('add',function(){
                console.log('add another obj');
        });
    },

});
var personList = new PersonList();


var GroupView = Backbone.View.extend({

        tagName: 'div',
        TPL: _.template($('#group-template').html()),
        events: {
            'click .remove': 'clear',
            'click .modify': 'modify'
        },
        initialize: function(){
           this.listenTo(this.model,'destory',function(){this.remove();personList.remove(this.model)});
           this.listenTo(this.model,'change',this.render);
        },
        render: function(){
            this.$el.html(this.TPL(this.model.toJSON()));
            this.homework = this.$('.J_homework');
            console.log(this.homework.text());
            return this;
        },
        modify: function(){
            
            var self = this;
            var pkg = {
                'id': this.model.get('id'),
                'homeWork':'pp'
            }
            console.log(pkg)
            modifyData(pkg,function(data){
                if(data.status == 'success'){
                    self.model.set('homeWork',pkg.homeWork)
                }
            });
        },
        clear: function(){
            /*this.model.destroy();*/
            console.log('deldata: '+JSON.stringify(this.model));
            var self = this;
            delData( JSON.stringify(this.model), function(){
                    self.model.trigger('destory');console.log('leftData:'+JSON.stringify(personList))
                })
        },
});


var ContainerView = Backbone.View.extend({
    el: $('#J_container'),
    events: {
        'click #J_add' : 'doAdd',
        'click .remove' : 'doRemove'
    },
    addOne: function(person){
        var groupView = new GroupView({model:person});
        this.groupContent.append(groupView.render().el)
    },
    reset: function(){

        
    },
     initialize: function(){
         //this.listenTo(personList,'add',this.addOne);
         this.listenTo(personList,'all',this.render);
         this.groupContent = $('#groupContent');
         
    },
    doAdd: function(){
        fetchData(this.callBack)
        //personList.fetch();
    },

    callBack: function(data){
        $.each(data,function(i){
                personList.add(data[i])
            })
        console.log(JSON.stringify(personList))
        return true;
    },
    render: function(){
        this.groupContent.html('');
        var self = this;
        _.each(personList.models,function(person){
        var groupView = new GroupView({model:person});
        self.groupContent.append(groupView.render().el)
            
        })
    }
    });
    
var containerView = new ContainerView();


})
/*
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
    render: function(){
        var template = _.template($('#item-template').html());
        $(this.el).html(template);

    },
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

*/
