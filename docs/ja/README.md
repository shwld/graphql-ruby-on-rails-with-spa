# Rail

スタック

| GraphQL |  |
| ------------- | ------------- |
| [graphql-ruby](https://graphql-ruby.org/) | graphql APIサーバー実装のためのgem |
| [Vue Apollo](https://v4.apollo.vuejs.org/) | VueでApolloを扱うためのpackage |
| [GraphQL code generator](https://graphql-code-generator.com/) | graphql schema, queryからtypescriptの方を生成するツール |
| [GraphiQL](https://github.com/graphql/graphiql/blob/main/packages/graphiql/README.md) | graphqlのGUIクライアント `http://localhost:3000/grapiql` でアクセス |

## N+1
[graphql-batch](https://github.com/Shopify/graphql-batch)で対応する

``` query_type.rb
...

field :user, Types::Objects::UserType, null: true do
  argument :id, ID, required: true
end
def user(id:)
  Loaders::RecordLoader.for(User).load(id)
end

...
```

このように記述すると、`user` レコードのidをgraphql-batchが保持し、処理の最後でクエリをまとめてくれ、N+1対策となる
`belongs_to` 関連の場合は `RecordLoader`、 `has_many` 関連の場合は `AssociationLoader` を使う。
