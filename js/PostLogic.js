class Post {
    constructor (id, name, game, comment) {
      this.id = id
      this.name = name
      this.game = game
      this.comment = comment
  
    }
  
    create(id, name, game, comment) {
      return new Post(id, name, game, comment)
    }
    createFinished(post) { //в JS не можна робити перегрузку методів, тому довелось імпровізувати
      return post
    }
    add() {
        //document.getElementById("stylesheet").append(createPost.addPost(this.id, this.name, this.game, this.commentButton));
      document.getElementById("homepage").prepend(createPost.addLinkedPost(this.id, this.name, this.game, this.comment));
      console.log("add posts")
    }
  
    restart() {
      document.getElementById("stylesheet").remove()
      createPost.addGeneral()
      createPost.addHomePage()
    }
  }
  
  class CreatePostLogic {
    addGeneral() {
      var stylesheet = document.createElement('div')
      stylesheet.id = "stylesheet"
      var x = document.getElementById("leftblock")
      x.append(stylesheet)
    }
    addHomePage() {
      var homepage = document.createElement('div')
      homepage.id = "homepage"
      homepage.className = "selected-stylesheet-block"

      document.getElementById("stylesheet").append(homepage)
    }
    addLinkedPost(id, name, game, comment) {
      var stylesheetLinkedBlock = document.createElement('a')
      stylesheetLinkedBlock.className = "link"
      stylesheetLinkedBlock.href = "#" + id
      var stylesheetBlock = document.createElement('div')
      stylesheetBlock.className = "stylesheet-block"
      var userName = document.createElement('span')
      userName.innerHTML = name + "<br>"
      var gameName = document.createElement('span')
      gameName.innerHTML = game + "<br>"
      var textComment = document.createElement('span')
      textComment.innerHTML = comment + "<br>"
      stylesheetBlock.append(userName)
      stylesheetBlock.append(gameName)
      if (comment != null)
        stylesheetBlock.append(textComment)
      stylesheetLinkedBlock.append(stylesheetBlock)
      return stylesheetLinkedBlock
    }
  }
  

 var postList=[]
 const createPost = new CreatePostLogic()

 fetch('http://localhost:3000/api/data')
    .then(response => response.json())
    .then(data => {
        var i = 0;
        console.log(data)
        data.forEach(element => {
            postList.push(new Post(i++, element['name'], element['topic'], element['message']))
        });
        console.log(postList)
        createPost.addGeneral()
        createPost.addHomePage()
        fillPosts()
    })
    .catch(error => console.error('Error fetching data:', error));
 
  
  const pageModeChanger = {
    isDarkMode: false,
    dark: "img/dark mode.png",
    light: "img/light mode.png"
  }
    
  document.querySelector(".btn-toggle").addEventListener("click", function () {
    document.body.classList.toggle("Dark-theme");
    document.querySelector(".general").classList.toggle('Dark-theme');
    document.querySelector("#stylesheet").classList.toggle('Dark-theme');
    document.querySelector("#logodiv").classList.toggle('Dark-theme');
    for(var i=0; i<$(".stylesheet-block").length; i++)
      $(".stylesheet-block")[i].classList.toggle('Dark-theme');
    for(var i=0; i<$("input[type=submit]").length; i++)
      $("input[type=submit]")[i].classList.toggle('Dark-theme');
    for(var i=0; i<$(".filter-button").length; i++)
      $(".filter-button")[i].classList.toggle('Dark-theme');
    for(var i=0; i<$("input[type=text]").length; i++)
      $("input[type=text]")[i].classList.toggle('Dark-theme');
    for(var i=0; i<$("table#comments").length; i++)
      $("table#comments")[i].classList.toggle('Dark-theme');
      
    if (pageModeChanger.isDarkMode) {
      pageModeChanger.isDarkMode = false
      document.getElementById("image").src = pageModeChanger.light
    }
    else {
      pageModeChanger.isDarkMode = true
      document.getElementById("image").src = pageModeChanger.dark
    }
  })
  
  function fillPosts() {
    const fabricPost = new Post()
    fabricPost.restart()
    for (var j = 0; j < postList.length; j++) {
        fabricPost.createFinished(postList[j]).add()
    }
    
    $(".send-comment").click(function(){
      setCookie("openedHref", openedHref, 10)
    })
    
    $(".link").click(function(){
      openedHref=$(this).attr('href').substring(1);
      document.getElementsByClassName("selected-stylesheet-block")[0].classList.replace('selected-stylesheet-block', 'unselected-stylesheet-block')
      document.getElementById(openedHref).classList.replace('unselected-stylesheet-block', 'selected-stylesheet-block')
      setCookie("openedHref", openedHref, 10)
    })
  }
  
  
  function bubbleSortByGameName() {
    var array = new Array()
    for(var i=0; i < postList.length; i++)
    array.push(postList[i].game)
    for(var i=0; i < array.length; i++)
      for(var j=0; j < array.length-i-1; j++)
        if(array[j] < array[j+1]) {
          var x = array[j]
          array[j] = array[j + 1]
          array[j+1] = x
        }
  
  var intermediateList = new Array()
  for(var i = 0; i < array.length; i++)
    for(var j = 0; j < postList.length; j++)
      if (postList[j].game == array[i])
        intermediateList.push(postList[j])
  postList = intermediateList
  fillPosts()
  }
  
  function insertSortByLikes() {
    var array = new Array()
    alert(array)
    for(var i=0; i < postList.length; i++)
    array.push(postList[i].likes)
    for(var i=0; i < array.length; i++){
      let x = array[i]
      var j = i-1
      while(j>=0 && array[j]>x){
        array[j+1] = array[j]
        j--
      }
      array[j+1] = x;
    }
  alert(array)
  var intermediateList = new Array()
  for(var i = 0; i < array.length; i++)
    for(var j = 0; j < postList.length; j++)
      if (postList[j].likes == array[i])
        intermediateList.push(postList[j])
  postList = intermediateList
  fillPosts()
  }
  
  function bubbleSortById() {
    var array = new Array()
    for(var i=0; i < postList.length; i++)
    array.push(postList[i].id)
    for(var i=0; i <= array.length-1; i++)
      for(var j=0; j < array.length-i-1; j++)
        if(array[j] > array[j+1]) {
          var x = array[j]
          array[j] = array[j + 1]
          array[j+1] = x
        }
  
    var intermediateList = new Array()
    for(var i = 0; i < array.length; i++)
      for(var j = 0; j < postList.length; j++)
        if (postList[j].id == array[i])
          intermediateList.push(postList[j])
    postList = intermediateList
    fillPosts()
  }