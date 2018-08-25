//最后封装到高级单例模式里

var shopSort = (function(){
    //1.获取元素
    var header = document.getElementById('header');
    var buttons=header.getElementsByTagName('a');
    var shopList=document.getElementById('shopList');

//2.ajax请求服务端的数据进行展示
    var data=null;
    var xhr=new XMLHttpRequest();
    xhr.open('get','data/product.json',false);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4 && xhr.status==200){
            data=JSON.parse(xhr.responseText);
        }
    };
    xhr.send();
    console.log(data);

//3.将数据绑定到页面中
    function bindHtml(data){
        var str=``;
        data.forEach(function(item,index){
            str+=`<li>
            <img src="${item.img}" alt="">
            <p class="title">${item.title}</p>
            <p class="hot">热度${item.hot}</p>
            <del>￥9999</del>
            <span>￥${item.price}</span>
            <p class="time">上架时间：${item.time}</p>
        </li>`
        });
        shopList.innerHTML=str;
    }
    bindHtml(data);

//4.绑定点击事件
    ~function click(){
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].index=-1;
            buttons[i].onclick=function(){
                this.index*=-1;
                //先循环数据排序，再绑定页面展示
                var value=this.getAttribute('attrName');
                productSort(value,this.index);
                activeArrow.call(this);
                clearArrow.call(this);
            }
        }
    }();


//5.排序方法
    function productSort(value,index){
        if(value=='time'){
            data.sort(function(a,b){
                return (new Date(a.time)-new Date(b.time))*index;
            })
        }else{
            data.sort(function(a,b){
                return (a[value]-b[value])*index;
            })
        }
        bindHtml(data)
    }


//6.箭头active

    function activeArrow(){
        var up=this.children[0];
        var down=this.children[1];
        for (var i = 0; i < buttons.length; i++) {
            if(this.index == -1){
                down.classList.add('bg');
                up.classList.remove('bg');
            }else{
                up.classList.add('bg');
                down.classList.remove('bg');
            }
        }
    }

//7.clear箭头
    function clearArrow(){
        //判断点击的是否是这个button，如果不是则清除active
        for (var i = 0; i < buttons.length; i++) {
            if(this != buttons[i]){
                buttons[i].children[0].classList.remove('bg');
                buttons[i].children[1].classList.remove('bg');
                buttons[i].index=-1;
            }
        }
    }

    return {
        bindHtml:bindHtml,
        activeArrow:activeArrow,
        clearArrow:clearArrow,
    }

})();

















