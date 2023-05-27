# Learn 'React Testing Library with Jest'

## 목차

-   [React Testing Library?](#react-testing-library)
-   [Tutorial](#tutorial)
-   [`App.test.tsx` 워크플로](#apptesttsx-워크플로)
-   [jest-dom](#jest-dom)

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
