# Learn 'React Testing Library with Jest (pre)'

_<small>Learned this from the lecture of Bonnie Schulkin TY :D</small>_

---

## 목차

-   [React Testing Library?](#react-testing-library)
-   [톺아보기](#톺아보기)
-   [`App.test.tsx` 워크플로](#apptesttsx-워크플로)
-   [jest-dom](#jest-dom)
-   [Differences between RTL & Jest](#differences-between-rtl--jest)
-   [TDD](#tddtest-driven-development)
-   [테스트 유형](#테스트-유형)
-   [유닛 테스트 vs 기능 테스트](#유닛-테스트-vs-기능-테스트)
-   [가상 DOM 요소 탐색 우선순위](#가상-dom-요소-탐색-우선순위)
-   [`logRoles`와 `screen.debug`](#logroles와-screendebug)
-   [`user-event` vs `fireEvent`](#user-event-vs-fireevent)
-   [`jest.fn()`](#jestfn)
-   [유닛(Unit) 테스팅](#유닛unit-테스팅)
-   [Jest & RTL을 위한 ESLint 구성](#jest--rtl을-위한-eslint-구성)
-   [Mock Service Worker](#mock-service-worker)
-   [With Context](#with-context)
-   [Error logs](#error-logs)

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

## 톺아보기

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

    -   즉, 모든 테스트에서 jest-dom Matcher를 사용 가능하게 하며, 단언(Assertion)이 가능하게 함.

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

#### **React Testing Library(RTL)**

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
    -   _cf_
        -   `test.only( ... )` 해당 테스트만 실행.
        -   `test.skip( ... )` 해당 테스트는 실행하지 않음.

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

#### **TDD vs BDD(Behavior-Driven Development)**

-   테스팅 라이브러리는 사용자의 애플리케이션 사용 방식 테스트를 권장 - 행동 테스트.
-   BDD(행동 주도 개발)는 매우 명확하게 정의되어 있음 - 개발자, QA, 사업 파트너 등 다양한 역할 간의 협업이 필요하며, 서로 다른 그룹이 상호 작용하는 방식에 관한 프로세스도 정의되어 있음.

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

#### **인수(Acceptance) 테스트 / 엔드 투 엔드(E2E, End-to-End) 테스트**

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

---

## 가상 DOM 요소 탐색 우선순위

#### **Screen Query Methods**

```jsx
command[All]ByQueryType
```

-   `get` 요소가 DOM 내에 있을 것으로 예상. _ex. getAllByRole_
-   `query` 요소가 DOM 내에 있지 않을 것으로 예상. _ex. queryByLabelText()_
-   `find` 요소가 비동기적으로 나타날 것으로 예상. _ex. findByText()_

#### **References**

-   [About Queries - Priority | Testing Library](https://testing-library.com/docs/queries/about/#priority)
-   [jest-dom | Testing Library](https://github.com/testing-library/jest-dom)
-   [Cheatsheet(React) | Testing Library](https://testing-library.com/docs/react-testing-library/cheatsheet/)
-   [Which query should I use? | Testing Library](https://testing-library.com/docs/queries/about#priority)

#### **1. 누구나 액세스 가능한 쿼리(Queries Accessible to Everyone)**

-   마우스를 사용하고 있고, 화면을 시각적으로 보고 있으며, 보조 기술을 사용하는 사람이면 사용 가능한 쿼리.
-   `getByRole` 접근성 트리에서 노출된 모든 요소에 질의할 때 사용. `name` 옵션을 사용하며, Accesible name(_ex. `aria-label`_)을 기준으로 반환된 요소를 필터링할 수 있음 - 즉, 페이지에서 요소 역할을 식별.
-   `getByLabelText` form 필드에 적합한 메서드. 웹사이트 폼을 탐색할 때, label 텍스트를 사용해 요소를 탐색 - 스크린 리더가 액세스 가능.
-   `getByPlaceholderText` input 요소에 액세스. label을 대체하는 것은 아니지만 그것이 전부라면 다른 대안보다 나을 수 있음.
-   `getByText` form 바깥의 텍스트 컨텐츠 - 사용자가 요소를 찾는 주된 방법. 대화형이 아닌 디스플레이 요소에 사용.
-   `getByDisplayValue` form 요소의 현재 값 - 현재 값이 채워진 페이지를 탐색할 때 유용함.

#### **2. 시맨틱(Semantic) 쿼리**

-   누구나 액세스 가능한 쿼리 중, 어느 것도 사용할 수 없는 경우 사용.
-   `getByAllText` alt 속성을 지원하는 요소인 경우, 이를 사용해 해당 요소를 탐색 - img, area, input, 커스텀 요소 등.
-   `getByTitle` title 요소 탐색 - 스크린 리더에게 일관되게 읽히지 않으며, 일반 사용자들에게 표시되지 않음.

#### **3. Test IDs**

-   `getByTestId` 사용자는 이러한 메시지를 보거나 들을 수 없고, 스크린 리더도 액세스할 수 없어서 역할 또는 텍스트 별로 매치될 수 없거나 의미가 없는 텍스트(_ex. 동적인 텍스트_)에만 이 옵션을 사용하는 것을 권장.
    -   _cf. data-testId 속성을 사용하는 것은 소프트웨어 사용 방식과 유사하지 않으므로, 가능하면 피하는 것을 권장 - 하지만, DOM 구조나 CSS 클래스 이름을 기반으로 쿼리하는 것보다 나음._

<details>
<summary><i>Example</i></summary>

    // App.test.tsx
    import { render, screen } from "@testing-library/react";
    import App from "./App";

    test("button has correct initial color", function () {
      render(<App />);

      // find an element with a role of button and text of 'Change to blue'
      const colorButton = screen.getByRole("button", { name: "Change to blue" });

      // assertion: expect the background color to be red
      expect(colorButton).toHaveStyle({ backgroundColor: "red" });
    });

    // App.tsx
    function App() {
      return (
        <div className="App">
          <button style={{ backgroundColor: "red" }}>Change to blue</button>
        </div>
      );
    }

    export default App;

</details>

---

## `logRoles`와 `screen.debug`

#### **`logRoles`**

-   DOM 트리의 모든 암시적 `aria-roles`의 리스트를 출력할 때 쓰는 헬퍼 함수.
-   각 role에는 해당 ARIA role과 일치하는 모든 노드의 목록이 포함됨.
-   `getByRole`을 사용해 테스트하는 DOM에 쿼리를 보내는 방법을 찾을 때 유용.
-   페이지가 길어서 역할이 있는 항목들이 헷갈릴 경우에 유용.
-   [Debugging | Testing Library](https://testing-library.com/docs/dom-testing-library/api-debugging/#logroles)

    <details>
    <summary><i>Example</i></summary>

        // App.test.tsx
        import { render, screen } from "@testing-library/react";
        import App from "./App";
        import { logRoles } from "@testing-library/dom";

        test("getRoles", function () {
            const { container } = render(<App />);
            logRoles(container);
        });


        // shell
        console.log
            button:

            Name "Change to blue":
            <button
                style="background-color: red;"
            />

            --------------------------------------------------

    </details>

#### `screen.debug()`

-   특정 시점에 화면이 어떨지, 혹은 DOM이 어떻게 보일지 테스트 출력에 표시.
-   무언가를 찾을 수 있거나 없을 때, 이유를 파악하는 데 용이.

---

## `user-event` vs `fireEvent`

#### **`user-event`**

-   상호 작용이 브라우저에서 발생할 경우, 발생할 이벤트를 발송해 **사용자 상호 작용을 시뮬레이션**하는, 테스트 라이브러리에 동반되는 라이브러리.

    ```tsx
    /* 
      @testing-library/user-event@^14
      @testing-library/react@^14
      @testing-library/dom@^9
    
      user-event 14.0.0 - APIs always return a Promise.
      await 처리가 없으면 단언(Assertion)이 이벤트 완료를 기다리지 못함.
    */

    test("Fired onClick", async () => {
        // import userEvent from "@testing-library/user-event";
        const user = userEvent.setup();

        // render DOM
        render(<SummaryForm />);

        // get Elements
        const checkbox = screen.getByRole("checkbox");

        // fire click event
        await user.click(checkbox);

        // state after click
        expect(checkbox).toBeChecked();
    });
    ```

#### **`fireEvent`**

-   **DOM Event**를 디스패치 - 컴퓨터 이벤트를 시뮬레이션하기에 사용자 이벤트와 거리가 있을 수 있음.
-   React의 테스트 라이브러리에서 가져온 객체로서, click과 같은 메서드를 포함.
-   버튼의 활성화를 위한 `toBeEnabled`, 버튼의 비활성화를 위한 `toBeDisabled`, 체크박스를 위한 `toBeChecked` 등.

    ```tsx
    test("initial conditions", function () {
        render(<App />);

        // check that the button starts out enabled
        const colorButton = screen.getByRole("button", {
            name: "Change to Medium Violet Red",
        });
        expect(colorButton).toBeEnabled();

        // check that the checkbox starts out unchecked
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).not.toBeChecked();
    });
    ```

#### **Diff**

-   `fireEvent`는 단순 DOM 이벤트를 디스패치하는 반면, `user-event`는 전체 상호 작용을 시뮬레이션하여 여러 이벤트를 발생시키고, 도중에 추가 검사도 수행 가능.
-   테스팅 라이브러리에 내장된 `fireEvent`는 브라우저의 로우 레벨 dispatchEvent API—개발자가 어떤 엘리먼트에서 어떤 이벤트를 트리거할 수 있게 해주는—를 감싸는 가벼운 래퍼.
-   문제는 브라우저는 보통 하나의 상호 작용에 대해 하나의 이벤트를 트리거하는 것 이상으로 수행한다는 것—이를테면, 사용자가 텍스트 박스에 타이핑 시 엘리먼트가 포커스되어, 키보드 이벤트와 입력 이벤트가 발동되고 엘리먼트의 선택과 값이 조작됨.
-   `user-event`를 사용하면 구체적인 이벤트 대신, 사용자 인터랙션으로 기술 가능. 이는 브라우저에서 사용자 인터랙션이 일어나는 것처럼, 가시성과 상호작용성 검사를 추가하고 DOM을 조작—이를테면, 브라우저가 사용자에게 숨겨진 요소를 클릭하거나 비활성화된 텍스트 박스에 입력할 수 없도록.
-   하지만, ‘아직 실행되지 않은 사용자 인터랙션’ 같은 측면으로 인해 설명할 수 없는 측면이 있고, 이러한 경우 `fireEvent`를 이용하여 소프트웨어가 의존하는 구체적 이벤트를 디스패치할 수 있음.

#### **References**

-   [User Interactions | Testing Library](https://testing-library.com/docs/user-event/intro/)
-   [Why you should test with user-event](https://ph-fritsche.github.io/blog/post/why-userevent)

---

## `jest.fn()`

-   jest mock function.
-   테스트에서 컴포넌트를 렌더링할 때, `props`를 전달해야 하는 경우 사용.
-   Typescript, PropTypes 같은 정적 분석을 사용할 경우, 에러를 발생시키므로 필수 프로퍼티를 꼭 전달할 필요가 있음.
-   이때, `jest.fn()`을 프로퍼티로 전달하면 통과.
-   특별한 기능이 없고, 오류 방지를 위한 자리 표시자 역할.

```tsx
test("grand total updates properly if item is removed", async () => {
    render(<OrderEntry setOrderPhase={jest.fn()} />);
});
```

---

## 유닛(Unit) 테스팅

#### **유닛(Unit) 테스팅 함수**

-   함수의 유닛 테스트를 권장하는 경우
    -   기능 테스트로 테스트하기엔 로직이 너무 복잡한 경우.
    -   가령 엣지 케이스가 너무 많아서 기능 테스트로 테스트하기가 현실적으로 맞지 않는 경우가 존재 - 컴포넌트를 활성화시켜서 가능한 모든 엣지 케이스에 대해 기능 테스트를 수행하는 것이 과할 수 있음.
-   `describe()` jest에서 제공하는 전역 메서드로, 테스트를 그룹으로 묶는 방법.

    ```tsx
    // check whether the function is work well
    describe("Spaces before camel-case capital letters", () => {
        test("Works for no inner capital letters", () => {
            expect(replaceCamelWithSpaces("Red")).toBe("Red");
        });

        test("Works for one inner capital letters", () => {
            expect(replaceCamelWithSpaces("MidnightBlue")).toBe(
                "Midnight Blue"
            );
        });

        test("Works for multiple capital letters", () => {
            expect(replaceCamelWithSpaces("MediumVioletRed")).toBe(
                "Medium Violet Red"
            );
        });
    });
    ```

#### **유닛 테스팅이 유용한 경우**

-   복잡한 함수의 경우, 유닛 테스트를 통해 모든 가능한 엣지 케이스를 확인 가능 - 엣지 케이스 전부를 테스트하기 위해 컴포넌트를 활성화시킬 필요가 없음.
-   기능 테스트의 실패 원인을 판단하려는 경우 - 실패 원인은 기능 내의 광범위한 부분에 해당할 수 있는데 이를 유닛 테스트를 시도하고 실패할 시 해당 요소로 인해 테스트가 실패했다는 점을 알 수 있음.

---

## Jest & RTL을 위한 ESLint 구성

#### **ESLint 구성 설정**

-   `npm install eslint-plugin-jest-dom`
-   `npm install eslint-plugin-testing-library`

-   VS code의 ESLint 익스텐션 필요.
-   `package.json` 파일의 `eslintConfig` 속성을 제거하고, 개별 구성을 위해 프로젝트 루트 디렉터리에 `.eslintrc.json` 파일 생성.

    ```json
    // .eslintrc.json

    {
        "plugins": ["testing-library", "jest-dom"],
        "extends": [
            "react-app",
            "react-app/jest",
            "plugin:testing-library/react",
            "plugin:jest-dom/recommended"
        ]
    }
    ```

#### **VS code의 ESLint를 따르는 자동 수정 설정**

-   프로젝트 루트 디렉터리에 `.vscode` 폴더와 해당 폴더 내에 `settings.json` 파일 생성.
-   `source` 파일에 있는 모든 ESLint 문제를 수정하도록 설정.
-   `.gitignore`에 `.vscode`와 `.eslintcache`를 추가하는 것을 권장.

    ```json
    // .vscode/settings.json

    {
        "editor.codeActionsOnSave": {
            "source.fixAll.eslint": true
        }
    }
    ```

#### **VS code에서 저장 시 Prettier가 자동 적용되도록 구성하기**

-   `prettier` 익스텐션 필요.
-   프로젝트 루트 디렉터리에 `.vscode/settings.json` 파일에 아래의 옵션 추가.

    ```json
    // .vscode/settings.json

    {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": true
    }
    ```

#### **References**

-   [eslint-plugin-testing-library](https://github.com/testing-library/eslint-plugin-testing-library)
-   [eslint-plugin-jest-dom](https://github.com/testing-library/eslint-plugin-jest-dom)

---

## Mock Service Worker

#### **Why**

-   네트워크 호출을 가로채어 지정된 응답의 반환 필요.
-   테스트 도중 네트워크 호출 방지.
-   서버 응답에 기반한 테스트 조건 설정.

#### **How to**

-   `handler` 생성 - 특정 URL과 Route에 무엇을 반환할지 결정하는 함수.
-   요청을 처리할 테스트 서버 생성 및 테스트 도중 테스트 서버가 수신 대기 중인지, 인터넷으로 나가는 호출을 가로채고 있는지 확인.
-   각 테스트 이후, 다음 테스트를 위한 서버 핸들러 재설정.

```shell
npm install msw
```

```typescript
// src/mocks/handlers.ts
import { rest } from "msw";

export const handlers = [
    rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
        return res(
            ctx.json([
                { name: "Chocolate", imagePath: "/images/chocolate.png" },
                { name: "Vanilla", imagePath: "/images/vanilla.png" },
            ])
        );
    }),
];

// src/mocks/server.ts
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);

// src/setupTests.ts
import { server } from "./mocks/server";

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tesets are finished.
afterAll(() => server.close());
```

#### **Compare between MSW and Axios**

-   MSW는 요청을 만드는 데 사용된 라이브러리에 관계없이 모든 HTTP 요청을 모킹하는 데 사용할 수 있는 반면, Axios는 Axios를 사용해 만들어진 요청을 모킹하는 데만 사용 가능.
-   MSW를 사용하면 실제로 서비스 워커에 가로채서 모킹, 즉 API 서버에 실제 요청을 할 때와 같은 방식으로 작동하는 반면, Axios는 단순히 Axios 라이브러리를 모킹 구현으로 대체하므로 실제 요청과 정확하게 동일한 방식으로 동작하지 않을 수 있음.
-   MSW는 `msw` 패키지를 설치하여 바로 사용할 수 있지만, Axios는 `AxiosMockAdapter` 패키지가 추가로 필요.

#### **References**

-   [Introduce | Mock Service Worker](https://mswjs.io/docs)
-   [Response resolver | Mock Service Worker](https://mswjs.io/docs/basics/response-resolver)

---

## With Context

#### **개별적 Wrapper 적용**

-   `render` 함수에서 두 번째 인자 객체의 `wrapper` 속성에 wrapper로 사용할 Context Provider 할당.

```tsx
test("Update scoop subtotal when scoops change", async () => {
    const user = userEvent.setup();

    render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

    /* ... */
});
```

#### **전역적 Wrapper 적용**

-   Wrapper를 포함하는 Custom Render를 정의해서 사용.

```tsx
import { RenderOptions, render } from "@testing-library/react";
import { OrderDetailsProvider } from "../contexts/OrderDetails";

// define custom render function
const renderWithContext = (ui: JSX.Element, options?: RenderOptions) => {
    return render(ui, { wrapper: OrderDetailsProvider, ...options });
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { renderWithContext as render };
```

#### **References**

-   [Custom Render (React) | Testing Library](https://testing-library.com/docs/react-testing-library/setup/#custom-render)

---

## Error Logs

#### **`describe`문 내 테스트 공통 요소 취득 및 렌더링**

```tsx
describe("Grand total", () => {
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
        name: /grand total: \$/i,
    });

    test("grand total starts at $0.00", () => {
        expect(grandTotal).toHaveTextContent("0.00");
    });

    test("grand total updates properly if scoop is added first", async () => {
        const chocolateInput = await screen.findByRole("spinbutton", {
            name: "Chocolate",
        });
        /* ... */
    }
});
```

-   describe문으로 test suite를 묶어 테스트를 진행하며 발생.
-   공통된 부분을 함께 쓰기 위해, 공통된 요소 취득과 렌더링 부분을 각 테스트마다 기술하지 않고 상단에 기술하였더니 요소를 탐색하지 못했음.
-   **솔루션**
    -   각 테스트 내부에 요소 취득 부분과 렌더링 부분을 각각 기술하여 해결.

#### **Unmount timing lead to "test was not wrapped in act"**

-   Testing Library에서 테스트 클린업의 일부로 컴포넌트를 언마운트 한다면, 네트워크 요청을 중단하는 useEffect 반환 함수는 Testing Library의 자동 언마운트에서 명시적 언마운트처럼 동작해야 하는데, `Test was not wrapped in act` 에러 발생. (원래 자동 언마운트는 useEffect 반환 함수를 트리거하고 오류가 발생하지 않아야 함.)
-   [Github Issue | react-testing-library](https://github.com/testing-library/react-testing-library/issues/999)
-   **솔루션**

    1. 네트워크 요청을 하는 React 컴포넌트의 useEffect 훅 내부에 `new AbortCountroller()` 컨트롤러 자바스크립트 객체 생성.
    2. `fetch` 함수 혹은 `Axios`를 통한 네트워크 요청의 `RequestInit` 객체 내부 `signal` 속성에 컨트롤러의 `signal` 프로퍼티 할당.
    3. `useEffect` 훅의 반환값으로 `() => { abortController.abort(); }` 함수 반환.
    4. 테스트 케이스 내부에 렌더링하는 부분에서 `unmount` 함수를 구조분해해서 취득하고, 테스트가 끝난 후 명시적으로 언마운트.

        ```tsx
        test("e.g.", () => {
            const { unmount } = render(<OrderEntry />);
            /* test codes ... */
            unmount();
        });
        ```

---
