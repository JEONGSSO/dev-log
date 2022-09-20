Implementing GraphQL Servers

- GraphQL Servers 구현

In the last few chapters, we saw how GraphQL came to be and how the query
language and type system allows multiple clients to consume different use cases
through possibilities exposed by the server.

- 마지막 몇 장에서 우리는 그래프 GraphQL이 어떻게 생겨났고 어떻게 쿼리를 사용했는지 보았으며,

타입 시스템을 사용하여 여러 클라이언트에서 다른 케이스들을 통해 사용사례를 볼 수 있었습니다.

We also covered what we should be thinking about when designing a GraphQL schema.
While we discussed the concepts, we didn’t talk about how GraphQL servers are built and implemented in practice. In this chapter,

- 또한 우리가 GraphQL 스키마를 어떻게 설계 해야하는지 생각하고, 콘셉트에 대해 논의하면서 실제로

graphQL서버가 구축되고 구현되는 방법에 대해서는 언급하지 않았습니다.

In this chapter, we’ll see the main concepts in implementing GraphQL servers and a few examples.

- 이번 챕터에서는 GraphQL 서버 메인 콘셉트를 몇 가지 예제를 통해 살펴보겠습니다.

Every single languag- specific library has a different way of doing things, so we’ll be focused more on principles rather than specific ways of doing things.

- 모든 언어별 라이브러리 구현방법은 제각각이라 구체적인 방법보다는 원칙에 집중하여 설명하겠습니다.

## GraphQL Server Basics

Building a GraphQL server is simple in theory, but quite tricky in practice.

- GraphQl 서버를 구축하는 것은 이론적으론 간단해 보이지만 상당히 까다롭습니다.

If you’re familiar with the basic concepts of a GraphQL server, feel free to skip to the next section.

- GraphQL 서버의 기본 개념에 대해 잘 알고 있다면 다음 섹션으로 넘어갈 수 있습니다.

At its core, building a GraphQL server mainly requires three main things.

- 기본적으로 GraphQl 서버를 구축하려면 세 가지 주요 사항이 필요합니다.

- A type system definition (What we were designing in Chapter 2)
  - 타입 시스템 정의 (챕터2 내용).
- A runtime execution engine to fulfill the requested queries according to the type system. (What this chapter is all about)
  - 타입 시스템에 따라 요청된 쿼리를 수행하는 런타임 실행 엔진. (이번 챕터의 내용입니다.)
- In most cases: an HTTP server ready to accept query strings and variables.
  - 대부분의 케이스, 쿼리 문자열 및 변수를 허용할 준비가 된 HTTP 서버.

Almost every single language has a GraphQL server implementation, and all of them let us achieve these two elements in different ways.

- 거의 모든 단일 언어는 GraphQl 서버 구현을 가지고 있으며, 두 가지 요소를 다른 방식으로 구현할 수 있습니다.

A user will define both the type system and runtime behavior for an API, and the library will usually take care of implementing the GraphQL spec including the execution algorithm.

- 사용자는 API에 대한 타입시스템과 런타임 동작을 모두 정의하며, 일반적으로 실행 알고리즘을 포함한 GraphQl 사양을 구현합니다.

To fulfill queries, we need more than a type system, we need behaviors and the data behind this type system. In GraphQL the concept used to fulfill data for a certain field is called a resolver. At their core resolvers are really just simple functions

- 쿼리를 실행하기 위해선 타입 시스템과, 쿼리의 행동, 타입 시스템뒤의 데이터들이 필요합니다.

In GraphQL the concept used to fulfill for a certain field is called a resolver. At their core resolvers are really just simple functions

- GraphQL에선 특정 필드를 실행하는 개념을 리졸버라고 합니다.
- 코어 리졸버들은 단순한 일을합니다.

```js
function resolveName(parent, arguments, context) {
  return parent.name;
}
```

A resolver is in charge of resolving the data for a single field.

- 리졸버는 단일 필드의 데이터를 실행하는 역할을 한다.

The GraphQL engine will call the resolver for a particular field once it gets to this point.

- 예제를 보면 GraphQL엔진이 특정 필드의 리졸버를 호출합니다.

- 실제로 GraphQL 쿼리의 기본 실행은 트리 구조의 단순한 깊이 우선검색과 유사합니다.

At every step or node of a GraphQL query, a GraphQL server will typically execute the associated resolver function for that single field

- 쿼리의 모든 스텝과 GraphQL서버는 일반적으로 다음과 같습니다.
- 단일 필드에 대해 관련 리졸버를 실행합니다.

As you can see in the example above, a resolve function usually takes 3 to 4 arguments.

- 위의 예제에서 볼 수 있듯이 리졸버 함수는 일반적으로 3 ~ 4개 arguments를 사용하는데,

The first argument is usually the parent object

- 첫 번째 argument는 일반적으로 상위 객체 입니다.

This is the object that was returned by the parent resolver function

- 이 객체는 상위 리졸버 함수에서 반환된 것입니다.

If you take a look a the image above, this means that the name resolver would receive the user object the user resolver returned.

- 위의 이미지를 보면, name 리졸버가 user 리졸버를 받는것을 의미합니다.
<!-- - 그래서 resolverName의 parent는 user가 담겨있습니다. -->

The second argument are the arguments for the fields.

- 두 번째 argument는 필드에 대한 arguments입니다.

For example, if the field user was called with an id argument, the resolver function for the user field would receive the value provided for that id argument.

- 예를들면, 필드 user가 id 인수와 함께 호출된 경우, resolver 함수는 user field에 id agrument의 값을 받습니다.

Finally, the third argument is often a context argument.

- 마지막 세번째 인수는 컨텍스트 argument입니다.

This is often an object containing global and contextual data for the particular query.

- 이것은 흔히 특정 쿼리에 대한 전역 및 컨텍스트 데이터 입니다.

This is often used to include data that could potentially be accessed by any resolver.

- 컨텍스트 데이터는 잠재적으로 엑세스 할 수 있는 데이터를 포함하기 위해 사용됩니다.

- 이 컨텍스트를 설명하기위해 이런 쿼리가 있다고 가정해보면,

```graphql
query {
  user(id: "abc") {
    name
  }
}
```

You can imagine the GraphQL server would first call the user resolver, with our “root” object (which varies based on), the id argument, and the global context object

- GraphQL서버가 먼저 user리졸버를 호출하는것을 상상 할 수 있습니다.
- 구현에 따라 상이하지만 root객체, id aruments 및 전역 컨텍스트 객체입니다.

It would then take the result of the user resolver and use it to call the name resolver, which would receive a user object as a first argument, no extra arguments, and the global context object.

- 그런 다음 user리졸버의 결과를 가져와서 name 리졸버를 호출하는데 사용합니다.
- name 리졸버는 유일하게 첫 번째 aruments로 사용자 객체를 받고 전역 컨텍스트 객체를 받습니다.

With a type system in place, and resolvers ready to execute for every field, we’ve got everything needed for a GraphQL implementation to execute queries.

- 타입 시스템을 갖추고 모든 필드에 대해 실행 준비가 된 리졸버를 통해 GraphQL 쿼리를 실행하는데 필요한 것들을 모두 갖추었다.

If you have never implemented any GraphQL server until now, I’d encourage you to play around with your favorite language implementation of GraphQL and come back to this when you’re ready.

- 지금까지 GraphQL서버를 구현한적 없다면 이 방법을 권장할 것입니다.
- 좋아하는 언어로 GraphQL을 구현하며 사용하고, 준비가 되었다고 생각되면 다시 돌아와야 합니다.???

For now, we’re moving on to slightly more advanced concepts and considerations.

- 지금 더 심화된 콘셉트와 고려사항으로 넘어가겠습니다.
