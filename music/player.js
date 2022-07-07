var suibianqugeming;

fetch("/music/songs.json")
  .then((res) => res.json())
  .then(songs => {
    console.log("歌单请求完毕！");
    suibianqugeming=songs;
    [suibianqugeming[0],suibianqugeming[12]]=[suibianqugeming[12],suibianqugeming[0]];
    getwy(false,0);
    //getwy('3778678',suibianqugeming.length-1);
  })
  .catch(err => console.log('请求出错，或您的浏览器不支持，请使用Chrome内核的浏览器！'));
  
  window.onkeydown=function(e){
      if(e.keyCode==39)window.t.skipForward();//下一首
      if(e.keyCode==37)t.skipBack();//上一首
  };


function player(){
    var t=new TPlayer({
    element:document.getElementById("TPlayer"),
    fixed:true,//开启吸底模式
    autoplay: false,//音频自动播放
    theme:	'#0d81f4',//主题色
    loop:"all",//列表循环播放, 可选值: 'all', 'one', 'none'
    preload: 'none',//预加载，可选值: 'none', 'metadata', 'auto'
    lrcType: 1,//展示歌词，3为从lrc中读取，false为关闭
    mutex: false,//互斥，当前播放器播放时暂停其他播放器
    listmaxheight: '200px',//列表最大高度
    listFolded:true,//列表默认折叠
    audio:suibianqugeming
    });
    window.t=t;
    //mic.getcookie();切换页面连续播放
}
/*
,
    {
        "name": "网易云热门歌单",
        "author": ">>",
        "content": []
    }*/
function getwy(id,index){
if(id==false){player();return;}
      fetch("https://api.i-meto.com/meting/api?server=netease&type=playlist&id="+id)
          .then((res) => res.json())
          .then(list => {
            suibianqugeming[index].content=list;player();
          })
          .catch(err => {console.log(err);player();});
}
