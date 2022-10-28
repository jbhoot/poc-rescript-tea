open Tea.Html

type state = {counter: int}

type msg =
  | Increment // This will be our message to increment the counter
  | Decrement // This will be our message to decrement the counter
  | Reset // This will be our message to reset the counter to 0
  | Set(int) // This will be our message to set the counter to a specific value

let init = () => {counter: 5}

let update = (model, msg) =>
  switch msg {
  | Increment => {counter: model.counter + 1}
  | Decrement => {counter: model.counter - 1}
  | Reset => {counter: 0}
  | Set(v) => {counter: v}
  }

let view_button = (title, msg) => {
  button(list{Events.onClick(msg)}, list{text(title)})
}

let view = model =>
  div(
    list{},
    list{
      span(
        list{Attributes.classList(list{("value", true)})},
        list{model.counter->Js.Int.toString->text},
      ),
      br(list{}),
      view_button("Increment", Increment),
      br(list{}),
      view_button("Decrement", Decrement),
      br(list{}),
      view_button("Set to 35", Set(35)),
      br(list{}),
      if model.counter != 0 {
        view_button("Reset", Reset)
      } else {
        noNode
      },
    },
  )

let main = Tea.App.beginnerProgram({
  model: init(),
  update,
  view,
})
