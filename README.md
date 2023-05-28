# Learn 'React Testing Library with Jest'

## 목차

-   [React Testing Library?](#react-testing-library)
-   [Tutorial](#tutorial)
-   [`App.test.tsx` 워크플로](#apptesttsx-워크플로)
-   [jest-dom](#jest-dom)
-   [Differences between RTL & Jest](#differences-between-rtl--jest)
-   [TDD](#tddtest-driven-development)
-   [테스트 유형](#테스트-유형)
-   [유닛 테스트 vs 기능 테스트](#유닛-테스트-vs-기능-테스트)

---

## React Testing Library?

#### **_철학적 부분_**

-   실제 사용자가 사용하는 방식의 소프트웨어 테스트.
    -   내부 구현 테스트(소프트웨어 작성법)를 대신하는 것. 여기서 중요한 것은 소프트웨어의 작동 여부인데, 작성한 코드의 변경 방식과 소프트웨어 사양에 따라 계속 작동하는 한 테스트를 통과.
-   테스트 ID를 사용하는 대신, 접근성 마커로도 요소 탐색이 가능.
    -   이는 스크린 리더와 다른 보조 기술로 요소를 찾는 것으로 요소를 찾을 수 있다면 스크린 리더로도 가능하며, 이는 소프트웨어의 접근 가능을 의미.

#### **_RTL & Jest_**

-   **RTL**은 테스트를 위한 가상 DOM을 제공.
    -   브라우저 없이 테스트를 진행하려면, 클릭 요소와 같은 작업을 할 때 가상 DOM이 필요하며, 가상 DOM이 원하는 대로 작동하는지 확인 또한 가능.
-   **Jest**는 테스트 러너로, 테스트를 찾고, 실행하고, 통과 여부 결정 등의 역할을 함.

---

## Tutorial

#### **_Init CRA_**

```shell
npx create-react-app . --template typescript
```

<details>
    <summary>
        <i>
        npm run test
        </i>
    </summary>

    No tests found related to files changed since last commit.
    Press `a` to run all tests, or run Jest with `--watchAll`.

    Watch Usage
    › Press a to run all tests.
    › Press f to run only failed tests.
    › Press q to quit watch mode.
    › Press p to filter by a filename regex pattern.
    › Press t to filter by a test name regex pattern.
    › Press Enter to trigger a test run.

</details>

<details>
    <summary>
        <i>
        Press a - PASS
        </i>
    </summary>

    PASS  src/App.test.tsx
    ✓ renders learn react link (16 ms)

    Test Suites: 1 passed, 1 total
    Tests:       1 passed, 1 total
    Snapshots:   0 total
    Time:        0.901 s
    Ran all test suites.

    Watch Usage: Press w to show more.

</details>

<details>
    <summary>
        <i>
        Press a - FAIL
        </i>
    </summary>

    FAIL  src/App.test.tsx
      ✕ renders learn react link (16 ms)

      ● renders learn react link

        TestingLibraryElementError: Unable to find an element with the text: /learn react/i. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.

        Ignored nodes: comments, script, style
        <body>
          <div>
            <div
              class="App"
            >
              <header
                class="App-header"
              >
                <img
                  alt="logo"
                  class="App-logo"
                  src="logo.svg"
                />
                <p>
                  Edit
                  <code>
                    src/App.tsx
                  </code>
                   and save to reload.
                </p>
                <a
                  class="App-link"
                  href="https://reactjs.org"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Learning React Testing Library
                </a>
              </header>
            </div>
          </div>
        </body>

           5 | test('renders learn react link', () => {
           6 |   render(<App />);
        >  7 |   const linkElement = screen.getByText(/learn react/i);
             |                              ^
           8 |   expect(linkElement).toBeInTheDocument();
           9 | });
          10 |

          at Object.getElementError (node_modules/@testing-library/dom/dist/config.js:37:19)
          at Object.<anonymous> (src/App.test.tsx:7:30)

    Test Suites: 1 failed, 1 total
    Tests:       1 failed, 1 total
    Snapshots:   0 total
    Time:        0.453 s, estimated 1 s
    Ran all test suites.

    Watch Usage: Press w to show more.

</details>

---

## `App.test.tsx` 워크플로

<details>
    <summary>
        <i>
        Snippet
        </i>
    </summary>

    // App.test.tsx
    import React from 'react';
    import { render, screen } from '@testing-library/react';
    import App from './App';

    test('renders learn react link', () => {
        render(<App />);
        const linkElement = screen.getByText(/learn react/i);
        expect(linkElement).toBeInTheDocument();
    });

</details>

#### `render()`

-   인수로 제공하는 JSX에 관한 가상 DOM을 생성하며, 여기서 JSX에 관한 인수는 App 컴포넌트.
-   렌더링된 가상 DOM에는 `screen`, `global` 객체로 액세스.
-   `render` 메서드와 `screen`, `global` 객체 둘 다 RTL, 즉 `@testing-library/react`을 import해서 가져옴.

#### `getByText(regex || string)`

-   `screen` 객체에서 `getByText` 메서드를 실행하며, 표시되는 모든 텍스트를 기반으로 DOM에서 요소 탐색.

#### `expect(linkElement).toBeInTheDocument();`

-   **단언(Assertion)**, 테스트 성공과 실패의 원인으로, 테스트의 통과 여부 결정.
-   Jest의 전역 메서드인 `expect`로 시작하며, 인수는 '단언'을 단언하는 것으로, 시나리오가 성립하는지 확인하기 위해 Jest에서 확인.
-   `toBeInTheDocument`는 일종의 **Matcher**로, 단언의 타입을 의미하며 가끔 인수를 갖지만 Jest DOM에서 오는 `toBeInTheDocument`는 인수를 갖지 않음.
-   엘리먼트가 문서에 있거나, 없음을 의미.

---

## jest-dom

-   CRA에 제공되어 패키지 설치 시 함께 설치됨.
-   `setupTests.js` 파일을 사용해 각각의 테스트 이전에 jest-dom을 가져옴.

    -   즉, 모든 테스트에서 jest-dom Matcher를 사용 가능.

    -   <details>
            <summary>
                <i>
                setupTests.js snippet
                </i>
            </summary>

            // jest-dom adds custom jest matchers for asserting on DOM nodes.
            // allows you to do things like:
            // expect(element).toHaveTextContent(/react/i)
            // learn more: https://github.com/testing-library/jest-dom
            import '@testing-library/jest-dom';

        </details>

-   `tobe`, `toHaveLength`는 일반적인 Matcher로, 모든 Node.js 코드에 적용 가능.

-   `toBeInTheDocument` 같은 DOM 기반의 Matcher는 가상 DOM에만 적용 가능.

-   이밖에도 DOM에서 볼 수 있는지 여부의 `toBeVisible()`,
    체크박스의 `toBeChecked()`도 DOM 기반의 Matcher.

---

## Differences between RTL & Jest

-   **React Testing Library(RTL)**

    -   컴포넌트의 가상 DOM 렌더링 보조 - 테스트를 위한 가상 DOM 생성.
    -   가상 DOM 탐색 보조 - 브라우저 없이 테스트를 가능케 함.
    -   가상 DOM 상호 작용 보조 - 가상 DOM과 상호 작용할 수 있는 유틸리티 제공.

-   여기까지가 RTL의 역할이고, 이를 이용해 테스트할 테스트 러너가 필요.
-   테스트 탐색, 실행, 단언 도구로 사용되는 것이 **Jest**.
-   `Mocah.js`, `Jasmine.js`도 있으나, 테스팅 라이브러리에서 Jest를 제공하며 CRA 패키지에 포함.

#### **Jest**

-   Watch Mode

    -   Jest를 실행하는 방법 중 하나.
    -   마지막 커밋 이후 파일의 모든 변경 사항을 확인하고, 마지막 커밋 이후 변경된 파일과 연관된 테스트만 실행.
    -   마지막 커밋 이후 변경 사항이 없는데, `npm run test` 스크립트를 실행한다면 변경된 사항이 없다는 메시지 표시.

-   `App.test.jsx`

    ```jsx
    import { render, screen } from "@testing-library/react";
    import App from "./App";

    test("renders learn react link", () => {
        render(<App />);
        const linkElement = screen.getByText(/learn react/i);
        expect(linkElement).toBeInTheDocument();
    });
    ```

-   `test(arg1, arg2)`
    -   2개의 인수를 지닌 전역 테스트 메서드.
    -   `arg1: string`
        -   테스트의 문자열 설명.
        -   보통 1개 이상의 테스트를 실행하기 때문에 Jest에서 이 인수를 사용해 어떤 테스트를 실패했는지 알 수 있음.
    -   `arg2: () => { /* tests */ }`
        -   테스트 함수.
        -   Jest는 테스트의 성공과 실패를 결정하기 위해 이 함수를 실행.
        -   테스트는 테스트 함수를 실행할 때 에러가 발생하면 실패하게 되고, 단언은 예상이 틀렸을 때 에러를 발생시켜 테스트를 실패하게 함.
        -   즉, 빈 테스트를 실행하면 에러가 발생하지 않아 항상 성공하며, 에러 객체를 던지면 무조건 실패하게 됨.

---

## TDD(Test-Driven Development)

-   코드 작성 전, 테스트를 작성해 테스트에 통과하도록 코드를 작성하는 것.
-   'red-green' 테스트라고도 하는데, 코드 작성 전에 테스트에 실패하는 red 테스트를 먼저 실행하고, 코드 작성 후에는 통과하는 green 테스트를 확인하는 것.
-   그래서 보통 테스트를 작성하기 전, 약간의 코드를 작성해 테스트에 오류가 발생치않도록 함.

-   <details>

      <summary>
      <i>Example Workflow</i>
      </summary>

    1. 함수 혹은 함수형 React 컴포넌트를 작성하되, 아무것도 하지 않는 빈 함수 작성.
    2. 테스트 작성 - 함수가 아무것도 하지 않으므로 테스트 실패.
    3. 코드를 작성하여 테스트 통과.
     </details>

#### **TDD를 사용하는 이유**

-   프로세스의 한 부분 - 느끼는 방식에 차이가 있을 수 있으나, 마지막에 해야 하는 따분한 일이 아니라 코딩 프로세스에 통합된 일부.
-   애플리케이션을 원하는 대로 작동하는지 확인하며 소프르웨어를 업데이트하는, 이는 수동 테스트이지만, 코드 작성 전에 테스트를 작성하면 변경 후 자동으로 재실행.
-   그래서 개발하며 모든 테스트를 작성해두면, 변경 사항이 생길 때마다 모든 테스트를 재실행해 자동 회귀 테스트 가능.
-   변경 사항 확인을 위해 애플리케이션을 열어 수동으로 테스트할 필요가 없음.

---

## 테스트 유형

#### **유닛(Unit) 테스트**

-   보통 함수나 별개의 React 컴포넌트 코드의 한 유닛, 혹은 단위를 테스트.
-   이 유닛이 다른 코드의 유닛과 상호 작용하는 것을 테스트하는 것이 아님.

#### **통합 테스트**

-   여러 유닛이 함께 작동하는 방식을 테스트하여 유닛 간의 상호 작용을 테스팅.
-   컴포넌트 간의 상호 작용이나, 마이크로 서비스 간의 상호 작용 등.

#### **기능(Functional) 테스트**

-   특정 코드 함수가 아닌, 소프트웨어의 일반적인 동작을 의미 - 이를테면, 데이터를 폼에 입력하고 제출하면, 소프트웨어가 특정 데이터 세트로 작동하는 기능의 확인 필요.
-   즉, 코드가 아닌 동작 자체를 테스트.
-   RTL은 기능 테스트를 권장.

#### \*\*인수(Acceptance) 테스트 / 엔드 투 엔드(E2E, End-to-End) 테스트

-   실제 브라우저와 애플리케이션이 연결된 서버가 필요.
-   보통 `Cypress`, `Selenium` 등의 특별한 도구 사용.
-   RTL을 위해 설계된 테스트는 아님.

---

## 유닛 테스트 vs 기능 테스트

#### **유닛(Unit) 테스트**

-   테스트를 최대한 격리시켜서, 함수나 컴포넌트를 테스팅할 때 의존성을 표시.
-   즉, 다른 의존성이 있거나 컴포넌트가 의존하는 다른 함수가 존재할 경우, 실제 버전 대신 테스트 버전을 사용.
    -   따라서 문제가 발생하거나 테스트에 실패 시, 생태계의 다른 어떤 것이 아닌 테스트에 실패하게 만드는 **특정 유닛**이 문제.
-   내부 테스트도 진행 - 이유는 격리 상태에서 테스트를 진행하면, 때로는 상태(state)의 차이점에 관해서만 테스트하게 되는데, 이는 애플리케이션 변경 사항을 확인하는 다른 컴포넌트가 없기 때문.
    -   **따라서 격리된 유닛에서 실패를 쉽고 정확히 파악할 수 있음.**
-   테스트가 코드의 한 유닛에 격리되어 있으므로, 테스트가 실패하는 경우 어디를 확인해야 하는지 정확히 알 수 있음.

-   **하지만, 사용자가 소프트웨어와 상호 작용하는 방식과 다소 상이.**
    -   따라서 테스트에 통과했으나 소프트웨어와 상호 작용하는 사용자가 실패하거나, 사용자가 소프트웨어와 상호 작용하는데 문제가 없어도, 테스트에 실패 가능.
        즉, 사용자가 소프트웨어와 상호 작용하는 방식과는 덜 밀접하게 연결되어 있음.
-   리팩토링(Refactoring)이란, 동작을 변경하지 않고 소프트웨어 작성 방식을 변경하는 것으로, 보통 유닛 테스트로 소프트웨어가 어떻게 작성되었는지 테스트함.
    -   작성 방식을 변경하면, 동작이 변경되지 않았음에도 테스트에 실패할 수 있음—즉, 내부 테스팅을 시행함.
-   소프트웨어가 제대로 작동하면 테스트도 통과해야 하기 때문에, 이런 점은 단점이 됨.

#### **기능(Functional) 테스트**

-   테스트하는 특정 동작이나, 유저 플로우와 연관된 모든 단위를 포함.
-   **사용자가 소프트웨어와 상호 작용하는 방식과 상당히 밀접함.**
    -   즉, 테스트 통과 시 사용자에게 문제가 없을 가능성이, 테스트 실패 시 사용자에게 문제가 발생할 가능성이 높음을 의미.
    -   테스트가 견고함을 의미하기도 함.
-   유닛 테스트와는 달리, 코드 작성 방식을 리팩토링하면 동작이 동일하게 유지되는 한 테스트도 통과하게 됨.
-   **하지만, 실패한 테스트를 디버깅하기 어려운 단점이 존재.**
    -   유닛 테스트처럼 코드가 테스트와 밀접하게 연결되어 있지 않아, 정확히 어떤 부분의 코드가 테스트 실패의 원인인지 정확히 알기 어려움.
