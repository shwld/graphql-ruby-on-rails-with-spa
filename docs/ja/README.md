## スタック

| GraphQL                                                                               |                                                                        |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| [graphql-ruby](https://graphql-ruby.org/)                                             | graphql API サーバー実装のための gem                                   |
| [GraphQL code generator](https://graphql-code-generator.com/)                         | graphql schema, query から typescript の方を生成するツール             |
| [GraphiQL](https://github.com/graphql/graphiql/blob/main/packages/graphiql/README.md) | graphql の GUI クライアント `http://localhost:3000/grapiql` でアクセス |

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
