var app = new Vue({
  el: '#app',
  data : {
    newTodo: '',
    deadline: '',
    comment: '',
    editmode: false,
    todos: [],
    cacheTodo: {},
    cacheTitle: '',
    cacheKey: '',
    visibility: 'all'
  },
  methods: {
    setFormDefault: function(){
      this.newTodo = '';
      this.deadline = '';
      this.comment = '';
      this.editmode = false;
    },
    addTodo: function(){
      var value = this.newTodo.trim();
      if(!value){return;}
      var timestamp = Math.floor(Date.now());
      var endDate = this.deadline;
      var message = this.comment;
      this.todos.push({
        id: timestamp,
        title: value,
        completed: false,
        deadline: endDate,
        comment: message
      });
      this.setFormDefault();
    },
    cancelTodo: function(){
      this.setFormDefault();
    },
    editTodo: function(item,key){
      this.editmode = true;
      console.log(item);
      console.log(key);
      this.cacheKey = key;
      this.newTodo = item.title;
      this.deadline = item.deadline;
      this.comment = item.comment;
    },
    updateTodo : function(){
      console.log(typeof this.cacheKey);
      console.log(this.todos[this.cacheKey]);
      var item = this.todos[this.cacheKey];
      item.title = this.newTodo;
      item.deadline = this.deadline;
      item.comment = this.comment;
      this.setFormDefault();
    }
  },
  computed : {
    filterTodo : function(){
      if(this.visibility == 'all'){
        return this.todos;
      } else if(this.visibility == 'progress'){
        return this.todos.filter(function(item,index,array){
          console.log(item);
          return !item.completed;
        })
      } else if(this.visibility == 'completed'){
        return this.todos.filter(function(item){
          return item.completed;
        })
      }
      return [];
    },
    remaining: function(){
      return (this.todos.filter(function(item){
        return !item.completed;
      })).length;
    }
  }
});