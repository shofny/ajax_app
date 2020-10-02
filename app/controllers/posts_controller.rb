class PostsController < ApplicationController
  def index #indexアクションを定義した
    @posts = Post.all
  end

  def new
  end

  def create 
    # ↑のcreateはルーティングの指示をうける変数だけでなく、ビューを呼び出す変数も兼ねている
    Post.create(content: params[:content])
  end
  # 2,コントローラーには、ルーティングで設定された流れ(このリクエストがきたらこのアクションを起動せよ)
  # というマニュアルが置いてあるので、それを見て実際に処理を行う
  # ビューから届いた包みを受け取ったコントローラーはparamsの中身を覗く
  # すると、:contentというタグがついた「form.text_field」が見つかるので、
  # その内容をサーバーのcontentに書いてねとモデルにお願いする

  # 3,処理がおわると、今行ったアクションと同じ名前のビューを呼び出す

end
