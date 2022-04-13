https://www.apollographql.com/docs/react/data/operation-best-practices/

1. 쿼리 operations를 사용하기 ✅

```graphql
# Recommended ✅
query GetBooks {
  books {
    title
  }
}

# Not recommended ❌
query {
  books {
    title
  }
}
```

operations 이름을 통해 무엇을 하는지 정확하게 식별가능 하기때문에 꼭 사용

2. provide arguments를 사용 ✅

```graphql
# Recommended ✅
query GetDog($dogId: ID!) {
  dog(id: $dogId) {
    name
    breed
  }
}

# Not recommended ❌
query GetDog {
  dog(id: "5") {
    name
    breed
  }
}
```

하나의 일정된 값이 아닌 변수로서 재활용성을 높임
캐시가 되지 않고 완전히 다른작업으로 간주되어서 성능상으로도 안좋다.

3. 필요한 인자만 필요한 만큼 가져오기 (overFetch문제 해결) 🚸
   - 몇개의 인자가 필요없는 상활일때 쿼리 질의를 남긴 코드가 있었음.

해당 쿼리는 적절하게 Fragment를 사용하여 분리해줄 필요가 있다.

```graphql
# Not recommended ❌
query GetGlobalStatus {
  stores {
    id
    name
    address {
      street
      city
    }
    employees {
      id
    }
    manager {
      id
    }
  }
  products {
    id
    name
    price {
      amount
      currency
    }
  }
  employees {
    id
    role
    name {
      firstName
      lastName
    }
    store {
      id
    }
  }
  offers {
    id
    products {
      id
    }
    discount {
      discountType
      amount
    }
  }
}
```

```graphql
# Recommended ✅
fragment NameParts on Person {
  title
  firstName
  middleName
  lastName
}
```

단, 과도하거나 비논리적으로 분할하면 혼란이 가중 될 수 있으니 전략을 잘 선택하자.

논리적 의미의 관계를 공유하는 필드만 분리하자
여러 쿼리가 특정 필드를 공유한다고 fragment를 만들지 말자.

```graphql
# Recommended ✅
fragment NameParts on Person {
  title
  firstName
  middleName
  lastName
}

# Not recommended ❌
fragment SharedFields on Country {
  population
  neighboringCountries {
    capital
    rivers {
      name
    }
  }
}
```

```graphql
# Returns all elements of the periodic table
query GetAllElements {
  elements {
    atomicNumber
    name
    symbol
  }
}

# Returns the current user's documents
query GetMyDocuments {
  myDocuments {
    id
    title
    url
    updatedAt
  }
}
```

GetAllElements와 GetMyDocuments의 단일 캐싱이 가능하여 캐시의 성능을 향상 시킬 수 있다.
