'use strict';

{
  const words = ['apple','sky','blue','middle','set']; //お題の配列

  
  let word = words[Math.floor(Math.random() * words.length)]; //配列からランダムで表示する文字
  let loc = 0; //何番目か判定する変数
  let score = 0; //スコアの初期値
  let miss = 0; //ミスのスコアの初期値
  const timeLimit = 3 * 1000; //残り時間
  let startTime; //
  let isPlaying = false; //ゲームが始まっているか、初期値は始まっていないのでfalse

  const target = document.getElementById('target'); //ターゲットのidを取得
  const scoreLabel = document.getElementById('score');//スコアカウンターのid取得
  const missLabel = document.getElementById('miss');//ミスカウンターのid取得
  const timerLabel = document.getElementById('timer');//タイマーのid取得


  function updateTaeget(){
    let placeholder = '';  //アンダーバーを格納する
    for(let i=0; i < loc; i++){
      placeholder += '_'; //アンダーバーを連結
    }
    target.textContent = placeholder + word.substring(loc);//substring文字列の切り出し
  }

  function updateTimer(){
    const timeLeft = startTime + timeLimit - Date.now(); //残り時間から経過時間を引いた値
    timerLabel.textContent = (timeLeft / 1000).toFixed(2);//toFixed 0.00まで表示

    const timeoutId = setTimeout(() => {
      updateTimer();//タイマーを作動
    },10);

    if(timeLeft < 0){
      isPlaying = false; //タイマーが0ならfalse
      clearTimeout(timeoutId);//タイマーを止める
      timerLabel.textContent = '0.00'; //アラートのokを押すと0.00になるようにする

      setTimeout(() => {
        showResult();//関数宣言

      }, 100) //0.00になると結果が出るようにしている

      target.textContent = 'click to replay';
    }
  }

  function showResult(){
    const accuracy = score + miss === 0 ? 0 : score / (score + miss) * 100; //スコア計算
    alert(`${score} letters. ${miss} misses.${accuracy.toFixed(2)}% accuracy!`);//スコア表示
  }

  window.addEventListener('click', () =>{
    if(isPlaying === true){ //ゲームが始まったら値を返す
      return;
    }
    isPlaying = true;

    loc = 0;
    score = 0;
    miss = 0;
    scoreLabel.textContent = score;
    missLabel.textContent = miss;
    word = words[Math.floor(Math.random() * words.length)];

    target.textContent = word; //クリックするとワードを表示する
    startTime = Date.now(); //経過時間
    updateTimer(); //関数宣言
  });

  window.addEventListener('keydown',e => { 

    if(isPlaying !== true){
      return;//ゲームが始まっていない時にカウントされないようにする
    }
    
    if(e.key === word[loc]){ 
      
      loc++; //打つword loc が足されていく

      if(loc === word.length){
        word = words[Math.floor(Math.random() * words.length)];//次のお題をランダムに表示
        loc = 0;//文字を最初の位置に戻す
      }
      updateTaeget();//関数にまとめる
      score++; //スコアが足されていく
      scoreLabel.textContent = score; //スコアを画面に表示

    } else{ ////もし押し込んだkeyがwordと違ったらmissと表示
      
      miss++; //ミスのスコアが足されていく
      missLabel.textContent = miss; //ミスのスコアを画面に表示
    }
  });















}