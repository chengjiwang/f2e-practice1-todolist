console.log(5);
var app = new Vue({
  el: '#app',
  data : {
    newTodo: '',
    editmode: false,
    todos: [],
    cacheTodo: {},
    cacheTitle: '',
    visibility: 'all'
  },
  methods: {
    addTodo: function(){
      var value = this.newTodo.trim();
      var timestamp = Math.floor(Date.now());
      if(!value){return;}
      this.todos.push({
        id: timestamp,
        title: value,
        completed: false
      });
      this.newTodo = '';
      this.editmode = false;
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
    }
  }
  
});