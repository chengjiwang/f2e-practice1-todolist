var app = new Vue({
  el: '#app',
  data : {
    newTodo: '',
    deadline: '',
    comment: '',
    isNewTodo: false,
    editMode: false,
    todos: [
      {
        'id': 01,
        'title': '運動',
        'completed': false,
        'deadline': '2018-06-10',
        'comment': '至少30分',
        'stared': true
      },
      {
        'id': 02,
        'title': '打掃房間',
        'completed': false,
        'deadline': '2018-06-12',
        'comment': '',
        'stared': false
      }
    ],
    cacheKey: '',
    visibility: 'all',
    isImportantStar: false
  },
  methods: {
    setFormDefault: function(){
      this.newTodo = '';
      this.deadline = '';
      this.comment = '';
      this.isNewTodo = false;
      this.editMode = false;
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
        comment: message,
        stared: false
      });
      this.setFormDefault();
    },
    cancelTodo: function(){
      this.setFormDefault();
    },
    deleteTodo: function(key){
      this.todos.splice(key,1);
    },
    editTodo: function(item,key){
      this.isNewTodo = true;
      this.editMode = true;
      this.cacheKey = key;
      this.newTodo = item.title;
      this.deadline = item.deadline;
      this.comment = item.comment;
    },
    updateTodo : function(){
      var item = this.todos[this.cacheKey];
      item.title = this.newTodo;
      item.deadline = this.deadline;
      item.comment = this.comment;
      this.setFormDefault();
    },
    updateStar: function(item,status){
      item.stared = status;
    }
  },
  computed : {
    filterTodo : function(){
      if(this.visibility == 'all'){
        return this.todos;
      } else if(this.visibility == 'progress'){
        return this.todos.filter(function(item,index,array){
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