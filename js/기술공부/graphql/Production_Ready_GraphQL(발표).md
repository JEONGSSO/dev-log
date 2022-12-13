Implementing GraphQL Servers

- GraphQL Servers 구현

In the last few chapters, we saw how GraphQL came to be and how the query
language and type system allows multiple clients to consume different use cases
through possibilities exposed by the server.

- 마지막 몇 장에서 우리는 그래프 GraphQL이 어떻게 생겨났고 어떻게 쿼리를 사용했는지 보았으며,

  타입 시스템을 사용하여 여러 클라이언트에서 다른 케이스들을 통해 사용사례를 볼 수 있었습니다.

We also covered what we should be thinking about when designing a GraphQL schema.

- 또한 우리가 GraphQL 스키마를 어떻게 설계 해야하는지 생각하였습니다.

While we discussed the concepts, we didn’t talk about how GraphQL servers are built and implemented in practice.

- 콘셉트에 대해 논의하는 동안 실제로 graphQL서버가 구축되고 구현되는 방법에 대해서는 언급하지 않았습니다.

In this chapter, we’ll see the main concepts in implementing GraphQL servers and a few examples.

- 이번 챕터에서는 GraphQL 서버 메인 콘셉트를 몇 가지 예제를 통해 살펴보겠습니다.

Every single language specific library has a different way of doing things, so we’ll be focused more on principles rather than specific ways of doing things.

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

- 거의 모든 단일 언어는 GraphQl 서버 구현을 할 수 있고, 두 가지 요소를 다른 방식으로 구현할 수 있습니다.

A user will define both the type system and runtime behavior for an API, and the library will usually take care of implementing the GraphQL spec including the execution algorithm.

- 사용자는 API에 대한 타입시스템과 런타임 동작을 모두 정의하며, 일반적으로 실행 알고리즘을 포함한 GraphQl 사양을 구현합니다.

To fulfill queries, we need more than a type system, we need behaviors and the data behind this type system.

- 쿼리를 실행하기 위해선 타입 시스템이 필요하고 더 나아가 타입 시스템 뒤의 행동, 데이터들이 필요합니다.

In GraphQL the concept used to fulfill for a certain field is called a resolver.

- GraphQL에선 특정 필드를 실행하는 개념을 리졸버라고 합니다.

At their core resolvers are really just simple functions

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

In fact, the basic execution of a GraphQL query often resembles a simple depth-first search of a tree-like data structure

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

- 115

### Leaking Existence

A common gotcha in API authorization is the subtle difference between: “This thing you’re looking for exists but you cannot access it”, and “This thing doesn’t exist (it actually does but I’m not telling you)”.

- 일반적인 api인증은 다음과 같은 미묘한 차이가 있다.
  : 존재하지만 권한때문에 거절된 경우 (403)와 존재하지만 존재하지 않는다고 막는 방법(404)

A lot of the time we don’t want to tell someone they don’t have access to a thing they tried accessing.

- 대부분의 경우 우리는 접근하려고 했던것에 접근 할 수 없다고 말하고 싶지 않다.

Take for example the node(id: ID!) field which allows clients to fetch types that implement the Node interface using a global identifier.

- 예를들어 클라이언트가 글로벌 식별자를 사용하여 구현한 필드 type을 가져올 수 있는 예로 들 수 있습니다.

If clients got an error like “You can’t access this object”, this instantly leaks the existence of this object to the client.

- 클라이언트에서 이 개체에 엑세스 할 수 없습니다 같은 오류가 발생하면 이 객체의 존재가 즉시 유출 됩니다.

To avoid that issue, we simply return null instead of returning an error.

- 이 문제를 방지하기 위해 오류 대신 null을 반환 합니다.

This means our type better be nullable, or else we risk nulling out a lot more of the response, another good reason to think twice before making a field non-nullable, as we discussed in Chapter 2 on schema design.

- 이것은 우리의 type이 무효화 되는것이 낫다는것을 의미한다.

  그렇지 않으면 스키마 설계에 대해 2장에서 논의한 것처럼 더 많은 응답을 무효화할 위험이 있기 때문이다.

## Blocking Introspection (스키마 확인 방어..?)

- Introspection은 graphql 공식 번역문서에 스키마 확인이라고 번역이 되어있는데, 스키마에 대한 정보를 요청하는것

One of the most popular concerns I see around securing GraphQL APIs is removing introspection capabilities from a server.

- GraphQl API 보안과 관련하여 가장 일반적인 문제 중 하나는 서버에서 Introspection 기능을 제거하는것이다.

This is generally a bit odd to me since that’s one of the reasons that make a GraphQL API so great to use.

- 이것은 GraphQL API를 사용하는 좋은 이유 중 하나이기 때문에 제거하는것은 이상하다

But of course, that depends on the context behind using that GraphQL API.

- 물론 Graphql api를 사용하는 환경 나름이긴하지만.

Internal APIs that want to hide upcoming features, especially if they’re accessible through something public like a browser might need to limit introspection to avoid leaking secret things.

- 다음에 나오는 내부 API를 엑세스 할 수 있는 경우 브라우저에서 엑세스하지 못하도록 제한해야 한다.

Internal APIs may also want to use query whitelisting, a process in which a GraphQL server only allows a known set of queries to be executed, often registered beforehand.

- GraphQl서버가 인가된 쿼리 세트만 실행하도록 허용하는 프로세스인 화이트 리스트를 사용하기 원할 수 있다.

This can often be used for private APIs that are used by client-side apps to block anyone from executing other queries than the ones the client makes.

- private API에는 클라이언트가 만드는 것보다 다른 쿼리를 실행하는 것을 차단하기 위해 사용될 수 있다.

Introspection is before all a tool for engineers/developers, not end users.

- Introspection은 사용자가 아니라 엔지니어 개발자를 위한 도구입니다.

This means it should be enabled in development, but there is no need to leave it open in production for an internal API.

- prod단계에서 개방된 상태로 둘 필요없이 개발 모드에서 활성화되어야 한다는 것을 의미합니다.

For public GraphQL API though, there is nothing inherently insecure about introspection since the schema is what we actually want to expose.

- public GraphQl API의 경우 실제로 노출하고자 하는 목적이 있기때문에 스키마 확인(introspection)에 본질적으로 안전하지는 않다.

Limiting introspection in those cases oddly sounds like “Security by obscurity"

- 스키마 확인을 제한하는 것은 이상하게 모호한 보안 처럼 들린다.??

For types and fields that should not be discovered, for example feature flags

- 이전에 예로 든 feature flags 같이, 검색하면 안되는 유형 및 필드의 경우

we’ve covered earlier in the book I prefer using schema visibility (which we’ve covered in Chapter 2)

- 스키마 visibility를 사용하는 것이 좋다.(2장에서 다룬 내용)

This allows us to hide certain parts of our schema to certain clients only.

- 이를 통해 특정 클라이언트에 대해서만 스키마의 특정 부분을 숨길 수 있다.

If you don’t have these two things in place and they require too much effort, limiting introspection can be used as a simpler measure.

- 만약 이 두가지(visibility랑 ??)를 제대로 갖추지 못했고 너무 많은 노력을 필요로 한다면 스키마 확인 제한하는것은 더 간단한 방법으로 사용할 수 있다.

However, keep in mind you might be restricting a very important feature for clients and tools.

- 클라이언트 및 툴의 매우 중요한 기능을 제한할 수 있습니다.

### Persisted Queries (지속된 쿼리)

Persisted queries are a very powerful concept that utilizes GraphQL’s strength while minimizing a lot of its pain points.

- Persisted Queries는 GraphQl의 강점을 활용하는 동시에 많은 문제점을 최소화하는 매우 강력한 개념이다

Let’s take a look at the normal flow of a GraphQL query, which by now you probably know quite well:

- Graphql의 정상적인 흐름을 살펴보면 (지금쯤이면 익숙할것이다)

In this scenario, the client sends the typical GraphQL query to a server, the server lexes, parses, validates and executes the query, and then returns the result to the client.

- 이 시나리오에서 클라이언트는 일반적인 GraphQL 쿼리를 서버로 보내고 서버는 쿼리를 구문 분석, 검증 및 실행한 다음 결과를 클라이언트에 반환합니다.

Let’s say this client was deployed to production.

- 이 클라이언트가 운영 환경에 배포되었다고 가정해 보겠습니다.

One thing we notice is that the query string the client sends never changes.

- 클라이언트가 보내는 쿼리 문자열은 변경 되지 않습니다. (개발자 도구에서 payload탭 query를 보게되면 항상같은 문자열을 보낸다는 뜻 같다)

In fact, sending the entire query to the server every time is totally useless!

- 사실 매번 전체 쿼리를 서버로 보내는것은 유용하지 않다,

We are wasting precious server side cycles by making the server parse and validate the same query string over and over again

- 서버가 동일한 쿼리 문자열을 반복적으로 구문 분석하고 검증하도록 함으로써 리소스를 낭비하고 있다.

Persisted queries attempt to solve that problem. Here’s how:

- Persisted Queries를 사용하여 이 문제를 해결하고자 합니다.

With persisted queries, instead of sending the full query document on every request, the client starts by registering queries with the server, before any query is even sent.

- Persisted Queries를 사용할 경우 모든 요청에 대해 전체 쿼리를 요청하는 대신 클라이언트는 쿼리 요청 전에 서버에 쿼리를 등록하는 것으로 시작됨.(??)

Sometimes these queries are registered before or during the deploy process.

- 때때로 이러한 쿼리는 배포 프로세스 전 또는 배포 중에 등록됩니다.

In other cases, the first query from a client is used as the “registration”.

- 다른 경우에는 클라이언트의 첫 번째 쿼리가 등록됨

In exchange, a GraphQL server capable of supporting persisted queries will provide the client with an identifier for that query

- 대신 persisted queries를 지원할 수 있는 GraphQl서버는 클라이언트에게 해당쿼리에 대한 식별자를 제공합니다.

Examples of good identifiers are query hashes, URLs at which the queries can be accessed, or simple IDs.

- 좋은 식별자의 예는 쿼리 해시, 쿼리에 엑세스 할 수 있는 URL또는 단순 ID입니다.

Once the client has the identifier for a particular query, it can send the identifier along with any needed variables to execute the query, this time without passing the full query document.

- 클라이언트가 특정 쿼리에 대한 식별자를 가지게 되면 전체 쿼리를 전달하지 않고 쿼리를 실행하는데 필요한 변수와 함께 식별자를 보낼 수 있습니다.

For example, if the server returned an URL after the registration of a certain query, the client could use this URL instead of sending the query document every single time

- 예를 들어 서버가 특정 쿼리를 등록 후 URL을 반환한 경우, 클라이언트는 매번 질의문서를 발송하는 대신 이 URL을 사용할 수 있습니다.

This has several amazing advantages.

- 이런 방식은 놀라운 이점을 가지고 있습니다.

First, clients never send the full query string anymore, saving a lot on bandwidth.

- 첫번째로 클라이언트는 더 이상 전체 쿼리 문자열을 전송하지 않으므로 대역폭을 크게 절약할 수 있습니다.

But not only that, servers can optimize queries by pre-parsing them, pre-validating them, and pre-analyzing them.

- 뿐만 아니라 서버는 쿼리를 미리 파싱하고 검증하고 분석하여 쿼리를 최적화 할 수 있습니다.

These things often become quite costly over time especially with large queries which makes persisted queries a very good idea for all serious GraphQL APIs.

- 이러한 쿼리들은 시간이 지날수록 대규모 쿼리로 인해 상당한 리소스를 소모하는 경우가 많은데, 이는 지속적인 쿼리(persisted queries)를 사용하여 개선할 수 있습니다.

Besides the performance and bandwidth improvements, this also helps API providers secure GraphQL APIs.

- 성능 및 대역폭 향상 외에도 GraphQl API 보안에 도움이 됩니다.

Earlier we covered whitelisted queries, which meant allowing only certain queries to be ran against our GraphQL server.

- 이전에 화이트 리스트 쿼리에 대해 다루었는데, 이는 특정 쿼리만 GraphQL서버에 대해 실행할 수 있음을 의미함.

With persisted queries, this is even more straightforward, since an API provider could allow only pre-registered queries to be run, essentially blocking access to all other queries against the API.

- persisted queries를 사용하면 API 제공자가 사전에 등록된 쿼리가 아니라면 간단하게 차단할 수 있다.

The funny thing with persisted queries implemented that way is that it starts to look a lot like what we wanted to escape in the first place, endpoint based and fixed queries! However, there’s a small detail that makes this so powerful.

- 이러한 방식으로 persisted queries를 구현할때 재밌는 점은 엔드포인트 기반의 고정된 쿼리처럼 우리가 피하고 싶었던 방향과 매우 유사하게 보이기 시작한다는 것입니다. 하지만 이것을 매우 강력하게 만드는 세부 옵션이 있습니다.

Even though we’re dealing with static queries/resources, these resources are generated by the clients rather than the server.

- 정적 쿼리 리소스를 처리하더라도 이러한 리소스는 서버가 아닌 클라이언트에 의해 생성됨.

In fact I love thinking of persisted queries as client dynamically generated resources, using the dynamic GraphQL engine to support as many different resources as needed by clients.

- 저는 persisted queries를 동적으로 생성된 클라이언트 리소스처럼 생각하는 것을 좋아합니다, 동적 GraphQL 엔진을 사용하여 클라이언트가 필요로 하는 다양한 리소스를 지원합니다.

Apollo has good libraries around persisted queries and a lot of server side libraries have functionality to cache or persist queries

- 아폴로는 persisted queries를 중심으로 좋은 라이브러리들을 보유하고 있으며, 많은 서버측 라이브러리는 쿼리를 캐시하거나 유지하는 기능을 가지고 있습니다.

For example, GraphQL Java has support for caching pre-parsed queries and GraphQL-Ruby supports an operation store in its pro version.

- 예를 들어, GraphQL java는 미리 구문 분석된 쿼리 캐싱을 지원하며 루비는 Pro버전에서 operation store(persisted queries의 중복제거 DB를 유지하는 기능)를 지원합니다.

Persisted queries are a must for all internal APIs, and I suspect they might become useful for public APIs as well eventually.

- Persisted queries는 모든 인터널 API에 필수적이며, 그것들이 결국 퍼블릭 API에도 유용하게 쓰일 수 있다고 생각한다.

## Summary

Rate limiting GraphQL requires more thought than a typical endpoint based API.

- (타임아웃에서 배운) rate 제한 GraphQL은 일반적인 엔드포인트 기반 API보다 더 많은 생각을 필요로 한다.

A complexity or time-based approach is your best choice for rate limiting clients.

- rate 제한 클라이언트에게는 complexity 또는 time-based 방식이 최선의 선택입니다.

Timeouts are a must to avoid long-running queries taking up too much server time.

- 타임 아웃은 장시간 실행되는 쿼리가 서버 시간을 너무 차지하지 않도록 방지해야 합니다.

Query depth is not as important as advertised, complexity and node count is often enough.

- 쿼리 깊이는 광고된?? 만큼 중요하지 않으며, 복잡성과 노드 수는 충분합니다.

Authorizing object types is often simpler and less error-prone than authorizing fields

- object types를 인증 하는 것이 필드를 인증하는것보다 더 간단하고 오류 발생 가능성이 낮습니다.

Disabling introspection is a good idea for private APIs, but should be avoided for public APIs.

- 비공개 API경우 introspection를 비활성화 하는것이 좋지만 퍼블릭 api는 비활성화를 피해야 합니다.

Persisted queries are a very powerful concept, especially for internal APIs

- Persisted queries는 특히 internal api에 매우 강력한 콘셉입니다.
