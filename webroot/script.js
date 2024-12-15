const go = new Go();

async function initWasm() {
  console.log("hi");

  WebAssembly.instantiateStreaming(fetch("lib.wasm"), go.importObject).then(
    (results) => {
      go.run(results.instance);

      console.log("exports", results.instance.exports.multiply(2, 3));
    },
  );
}
initWasm();

class App {
  constructor() {
    const output = document.querySelector("#messageOutput");
    const increaseButton = document.querySelector("#btn-increase");
    const decreaseButton = document.querySelector("#btn-decrease");
    const multiplyButton = document.querySelector("#btn-multiply");
    const usernameLabel = document.querySelector("#username");
    const counterLabel = document.querySelector("#counter");
    var counter = 0;

    // When the Devvit app sends a message with `context.ui.webView.postMessage`, this will be triggered
    window.addEventListener("message", (ev) => {
      const { type, data } = ev.data;

      // Reserved type for messages sent via `context.ui.webView.postMessage`
      if (type === "devvit-message") {
        const { message } = data;

        // Always output full message
        output.replaceChildren(JSON.stringify(message, undefined, 2));

        // Load initial data
        if (message.type === "initialData") {
          const { username, currentCounter } = message.data;
          usernameLabel.innerText = username;
          counterLabel.innerText = counter = currentCounter;
        }

        // Update counter
        if (message.type === "updateCounter") {
          const { currentCounter } = message.data;
          counterLabel.innerText = counter = currentCounter;
        }
      }
    });

    increaseButton.addEventListener("click", () => {
      // Sends a message to the Devvit app
      window.parent?.postMessage(
        { type: "setCounter", data: { newCounter: Number(counter + 1) } },
        "*",
      );
    });

    decreaseButton.addEventListener("click", () => {
      // Sends a message to the Devvit app
      window.parent?.postMessage(
        { type: "setCounter", data: { newCounter: Number(counter - 1) } },
        "*",
      );
    });

    multiplyButton.addEventListener("click", () => { });
  }
}

new App();
