class PostsController < ApplicationController
  def index #indexアクションを定義した
    @posts = Post.all.order(id: "DESC")
  end


  def create 
    post = Post.create(content: params[:content], checked: false)
    # index.html.erbの2-4行目で飛んできたものを参照 checkedは既読機能関連　読んでないのでfalseで送っている
    render json:{post: post}
    #帰ってきたデータをjsonに指定
    #postという変数にいれ、memo.jsに返却
  end
  
  def checked
    post = Post.find(params[:id])
    #URLパラメータからきたidをparamsで拾って、それを元に特定のレコードをfind
    #その情報をpostに代入

    if post.checked #既読かどうかを判定するプロパティを設定
      post.update(checked: false)
      # tureの時は、既読を解除するためfalseに変更
    else
      post.update(checked: :ture)
      #falseの場合は、既読に設定するためtureに変更
    end

    item = Post.find(params[:id])
    #上記のifで設定した値をここで改めて取得し、itemに代入
    render json: { post: item }
    #任意で設定するrenderを用いて、jsonを指定
    #postに先ほど取得したitemをいれて、checked.jsに返却
  end

end
