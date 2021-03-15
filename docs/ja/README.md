## is 何
`graphql-ruby` と `webpacker` を使った速度と柔軟性をバランス良く兼ね備えたテンプレートです。

RailsでReactやVueなどのモダンなJSを利用する場合、Railsのテンプレートに部分的にComponentを入れ込んでいく形を取ることが多くなりますが、これをやるとRailsのViewとSPAのコンポーネント間で複雑な情報の共有や、専用のREST API、Railsのform機能とどう統合するかなど、多岐にわたる複雑な問題にぶち当たり、メンテナンスが困難になりがちです。

これを解消したい場合、完全にAPIとViewを分けてしまい、JSだけのSPAとRailsのAPIとして作るのが割と理想です。
しかし、この構成だとRailsの良さである開発スピードが損なわれます。

このテンプレートは、小・中規模のプロダクションアプリケーションを実装するにあたって、Railsの速さと、API、SPAの分離によるメンテナンス性のバランスを追求したものです。

あとは、GraphQLを使いたかった。GraphQLをプロダクションでホイホイ使いつつ速度を出すにはどうすればよいのか。
からの、面倒な環境構築をテンプレートにする + Railsのスピードを体現するには実績のあるDeviseが使える構成にする = これ

Apolloを始めとしたGraphQL周りの開発体験が最高なのでGraphQLやっていこうぜっていうテンプレートです。
GraphQLはいいぞ

方向性としては `Hotwire` が対抗馬になる感じのやつ

## なぜGraphQLか
SPA + RESTで一回作って見るとわかるのではないでしょうか。
GraphQLは複雑なクライアントアプリケーションへの明確なソリューションです（断言）

Apollo clientはクライアントアプリケーションの状態管理をサーバーサイドに押し付けるための最高の道具です。
クライアントアプリが複雑になる要因の大半はREST APIの結果とクライアントで使いたいデータの形式のミスマッチだと思っています。

GraphQLではクライアントが使いたいデータを使いたい形式でとることができるため、APIの結果をそのまま使うことができます。
Apollo clientはその結果をうまくキャッシュしてくれるため、アプリケーションは常に最新のサーバーデータを利用した処理ができます。

その結果、サーバーとの状態同期処理の大半の部分をApollo clientに押し付けることができ、クライアントサイドで状態をもつ必要が殆どありません。

## なぜgraphql-rubyか
普通にgoとか、apollo-serverとかのほうがいいんじゃないかっていう意見もあると思いますが、graphql-rubyは普通に良く出来てるので、RailsやってるならここからGraphQL入門しても全然いいと思うぞよ。
何よりActiveRecord使えるのでRails+GraphQLの知識で行けるのがRailsエンジニアにとっては大きい

多少覚えないといけないことはありますが、mutationやqueryにRailsのコントローラーでやっていることを書くだけです。

## スタック

| GraphQL                                                                               |                                                                        |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| [graphql-ruby](https://graphql-ruby.org/)                                             | graphql API サーバー実装のための gem                                   |
| [GraphQL code generator](https://graphql-code-generator.com/)                         | graphql schema, query から typescript の方を生成するツール             |
| [GraphiQL](https://github.com/graphql/graphiql/blob/main/packages/graphiql/README.md) | graphql の GUI クライアント `http://localhost:3000/grapiql` でアクセス |

## このテンプレートを使うためにあるといいもの
- Railsの基本的な実装経験
- React or Vueを使えること
- GraphQLの知識
- graphql-rubyでgraphqlサーバーを実装する方法 (https://graphql-ruby.org/)
  - authorization周りは特に知っておいたほうが良い (https://graphql-ruby.org/authorization/overview.html)
  - graphqlにおけるN+1への対応方法 (https://github.com/Shopify/graphql-batch)
- Apolloの使い方 (https://www.apollographql.com/)

## このテンプレートの利点
- GraphQLの複雑な環境構築が済んでいるのですぐにGraphQLを使い始められます
- 開発速度を担保するため安定のDeviseを導入しています
- APIとSPAが疎結合なので、SPA部分を後で完全に切り離しやすいです。
- Railsはgraphql-rubyを主としてAPIに特化した依存のみを持っているため、APIモードに切り替えるのが容易です（Deviseの部分だけ別途認証機構を用意しないといけないのでそこをどうするかが課題ですが）
- 基本的にはgraphql-rubyを中心とした薄いテンプレートなので、カスタマイズしやすいと思います。

## N+1

[graphql-batch](https://github.com/Shopify/graphql-batch)で対応する

```query_type.rb
...

field :user, Types::Objects::UserType, null: true do
  argument :id, ID, required: true
end
def user(id:)
  Loaders::RecordLoader.for(User).load(id)
end

...
```

このように記述すると、`user` レコードの id を graphql-batch が保持し、処理の最後でクエリをまとめてくれ、N+1 対策となる
`belongs_to` 関連の場合は `RecordLoader`、 `has_many` 関連の場合は `AssociationLoader` を使う。

## テスト粒度 Rail

| 推奨                   |                                                                                                                             |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| graphql-autotest       | graphql-ruby のエンドポイントを自動でチェックしてくれる。実行することによって定義と最低限の実行エラーを網羅的に検知できます |
| Graphql code generator | 型により、フロント側の品質を向上します。null チェックはこいつが出力する型に従えば OK                                        |
| rspec                  | graphql の Query, Mutation のテストをすべて書く                                                                             |
| storyshots             | コンポーネントが表示されることを保証。また component の変更を差分として管理できる。                                         |

| 品質を重視するなら |                                        |
| ------------------ | -------------------------------------- |
| jest               | 複雑なロジックがあるところを書いていく |
| E2E                | やりたい                               |

| 開発速度を重視するなら |                                                                                                                                                                                                                                 |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GraphiQL               | rspec と storyshots を捨てて、GraphiQL 駆動で開発する。非常に高速に API の動作確認ができるので rspec を書かなくても実装がサクサク進んでしまう麻薬。これをやると割とすぐデグレやバグが起こるので速度重視じゃないなら封印を推奨。 |

## Rail

- Graphql code generator に従う
  - フロントはなるべくこいつの出力をそのまま使いましょう。分岐や複雑性は全部バックエンドに押し付けろ！ これを意識するとフロントのテストはほとんど書かなくても割と担保できると思う
