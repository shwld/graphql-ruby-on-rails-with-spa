## is 何
`graphql-ruby` と `webpacker` を使った速度と柔軟性をバランス良く兼ね備えたテンプレートです。

RailsでReactやVueなどのモダンなJSを利用する場合、Railsのテンプレートに部分的にComponentを入れ込んでいく形を取ることが多くなりますが、これをやるとRailsのViewとSPAのコンポーネント間で複雑な情報の共有や、専用のREST API、Railsのform機能とどう統合するかなど、多岐にわたる複雑な問題にぶち当たり、メンテナンスが困難になるがちです。

これを解消したい場合、完全にAPIとViewを分けてしまい、JSだけのSPAとRailsのAPIとして作るのが割と理想です。
しかし、この構成だとRailsの良さである開発スピードが損なわれます。

このテンプレートは、小・中規模のプロダクションアプリケーションを実装するにあたって、Railsの速さと、API、SPAの分離によるメンテナンス性のバランスを追求したものです。

## スタック

| GraphQL                                                                               |                                                                        |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| [graphql-ruby](https://graphql-ruby.org/)                                             | graphql API サーバー実装のための gem                                   |
| [Vue Apollo](https://v4.apollo.vuejs.org/)                                            | Vue で Apollo を扱うための package                                     |
| [GraphQL code generator](https://graphql-code-generator.com/)                         | graphql schema, query から typescript の方を生成するツール             |
| [GraphiQL](https://github.com/graphql/graphiql/blob/main/packages/graphiql/README.md) | graphql の GUI クライアント `http://localhost:3000/grapiql` でアクセス |

## このテンプレートの利点
- GraphQLの複雑な環境構築が済んでいるのですぐにGraphQLを使い始められます
- 開発速度を担保するため安定のDeviseを導入しています
- APIとSPAが疎結合なので、SPA部分を後で完全に切り離しやすいです。
- Railsはgraphql-rubyを主としてAPIに特化した依存のみを持っているため、APIモードに切り替えるのが容易です（Devise外しだけ大変なのでそこをどうするかが課題です）
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

| 推奨             |                                                                                                                             |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| graphql-autotest       | graphql-ruby のエンドポイントを自動でチェックしてくれる。実行することによって定義と最低限の実行エラーを網羅的に検知できます |
| Graphql code generator | 型により、フロント側の品質を向上します。null チェックはこいつが出力する型に従えば OK                                        |
| rspec                  | graphql のQuery, Mutationのテストをすべて書く                                                                                  |
| storyshots             | コンポーネントが表示されることを保証。また component の変更を差分として管理できる。              |

| 品質を重視するなら |                                        |
| ------------------ | -------------------------------------- |
| jest               | 複雑なロジックがあるところを書いていく |
| E2E                | やりたい                               |

| 開発速度を重視するなら |                                                                                                                                                                                                                                 |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GraphiQL                 | rspec と storyshots を捨てて、GraphiQL 駆動で開発する。非常に高速に API の動作確認ができるので rspec を書かなくても実装がサクサク進んでしまう麻薬。これをやると割とすぐデグレやバグが起こるので速度重視じゃないなら封印を推奨。 |

## Rail

- Graphql code generator に従う
  - フロントはなるべくこいつの出力をそのまま使いましょう。分岐や複雑性は全部バックエンドに押し付けろ！ これを意識するとフロントのテストはほとんど書かなくても割と担保できると思う
