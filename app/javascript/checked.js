function check(){
  
  const posts = document.querySelectorAll(".post");
    // .postを取得、変数に代入
  posts.forEach(function(post){
    // forEach文を用いて、取得したpostのメモ全てに適用する

    if (post.getAttribute("data-load") != null){
      return null
      //2,2秒後、もう1度checkが起動 今度はすでにxx行目で
      //data-loadが記入されているため、nullではなくなっているため8行目が成立
      //直後のreturn nullが読み込まれ処理が終了14行目は不発になる
    }
    post.setAttribute("data-load", "true")
    //1,画面を更新して１秒後、61行目のインターバルでcheckが起動
    //最初はdata-loadがない=「("data-load") == null」=8行目が成立しないので
    //直下のreturn nullが読み込まれず、上記のsetAttributeが読み込まれる

    post.addEventListener("click", () => {
      // クリックした時を定義　() =>は functionを略した
      const postId = post.getAttribute("data-id")
      //index.html.erb-8行目で設定したdata-idの属性値(post.id)を取得した
      const XHR = new XMLHttpRequest()
      //エンドポイントを呼び出すため、XMLHttpRequestオブジェクトを生成、XHRに代入
      XHR.open("GET", `/posts/${postId}`, true)
      // openメソッド定義(HTTPメソッドの指定, パスの指定[postIdは21行目], 非同期通信する？しない？)
      XHR.responseType = "json"
      // responseTypeでどの形式でレスポンスをして欲しいかを指定した
      XHR.send()
      // sendでリクエストを送信する　これを記すことで初めてリクエストが送信される
      //ここまでがコントローラーに情報を送る部分

      XHR.onload = () => {
      // onloadで、コントローラーから帰ってきた時に以下が起動する

        if (XHR.status != 200){
          //帰ってきたXHRのHTTPステータスが200(処理が成功した!)以外が帰ってきてしまったら
          alert(`Error ${XHR.status}: ${XHR.statusText}`)
          //alert(上にポップアップが出るアレ)に、ステータス番号と、テキストを表示
          return null
          //この表記が読み込まれることによってchecked.jsの全ての処理が終了、これ以降の処理は全て発生しなくなる
        }
        const item = XHR.response.post
        //XHR.responseで帰ってきたJSONにアクセス、itemの変数にいれた
        if (item.checked === true){
          //もし、その中のcheckedの属性値がtrueだったら( === )は厳密等価,絶対これ以外はだめという現れ
          post.setAttribute("data-check", "true")
          //post(=5行目の(post)=3行目に設定したposts=.post→index.html.erbにあるclass=post)
          //にdata-checkという属性と、　trueという属性値を追加する
        } else if (item.checked === false){
          //もし、その中のcheckedの属性値がfalseだったら
          post.removeAttribute("data-check")
          //postに設定されているdata-checkの属性を消してね
        }
      }


    });
  });
}
setInterval(check, 1000)