function memo(){
  const submit = document.getElementById("submit")
  // 送信ボタンのDOMを取得、submitに代入している
  // ここでいうById("submit")は  <%= form.submit '投稿する', 「id: "submit"」 %>
  submit.addEventListener("click", (e) => {
    //submitという変数(2行目で設定)をクリックした時 「(e) =>」は「function(e)」を略した
    const formData = new FormData(document.getElementById("form"))
    //「<%= form_with url: "/posts", method: :post, 『id: "form"』 do |form| %>」を指定
    // FormDataオブジェクトをnewで作成し、formDataという変数にいれた
    const XHR = new XMLHttpRequest();
    //非同期通信を行うために、XMLHttpRequestを生成
    XHR.open("POST", "/posts", true);
    //openを使い、リクエスト内容を指定 最初の2つはroutes.rbの「post 'posts'」, to: 'posts#create'
    //３行目は非同期通信のonoffを示す　true=onということ
    XHR.responseType = "json";
    //レスポンスの形式をjsonに指定した
    XHR.send(formData);
    //XHRをopenの情報を元に送信、同時にformDataという変数も送る

    XHR.onload = () => {
      //コントローラーから戻ってきたら発動する
      if (XHR.status != 200){
        //帰ってきたデーターのHTTPステータスが通信成功を示す200じゃなかったら
        alert(`Error ${XHR.status}: ${XHR.statusText}`)
        //ポップアップでエラーを表示させて
        return null
        //処理を強制的に終了、以降の処理を呼びださなくさせる
      }

      const item = XHR.response.post
      // itemという変数に、コントローラーからのレスポンスとして帰ってきたpostの内容を代入
      //render json:{post: post} (コントローラー10行目)
      const list = document.getElementById("list")
      // listという変数にHTMLを描写する場所を指定する親要素を取得して代入
      // <div id="list"></div>(index.html.erb７行目)
      const formText = document.getElementById("content")
      // formTextという変数に、メッセージフォームのidを指定
      //<%= form.text_field :content, id: 「"content"」 %>　(index.html.erb3行目)
      const HTML = `
          <div class="post" data-id=${item.id}>
            <div class="post-data">
              投稿日時：${item.created_at}
            </div>
            <div class="post-content">
            ${item.content}
            </div>
          </div>`;
        //HTMLという変数に、以下の情報を代入、これは実際に描画されるもの
        //大体はindex.html.erb11-19行目と同じもの　実際の投稿内容、日時、idは31行目で設定したものを参照
        //data-check=<%= post.checked %>は、check.jsにて後から追加・削除されるので書かなくでも良い(?)
        //　ここまで変数に代入しているフェイズ
      list.insertAdjacentHTML("afterend", HTML)
      //insertAdjacentHTMLを使用し、実際にHTML変数の内容を描画
      //afterend(要素(list)の直後に描写)の指定により、<div id="list">！ここに描画される！</div>
      formText.value = "";
      //37行目で指定した、formTextの記入欄を空白に上書き そのままだと投稿内容が残りっぱになってしまう
    };
    e.preventDefault();
    //処理を途中で中断する
    //クリックした時に、JSと通常のが同時に動き出す→２つ保存されてしまう（←まずい）
    //JSの処理が全て終わった後にこれを読み込ませることで
    //<%= form_with url: "/posts", method: :post, id: "form" do |form| %>
    //↑index.html.erb2行目に書いてある、本来通常行われるcreate処理を中断している
  });
}
window.addEventListener("load",memo)
//ウィンドウが開いて、ロードが終わったときに、1行目のmemoというfunctionが起動するように設定