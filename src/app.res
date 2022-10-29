open Tea.Html

type todo = {
  userId: int,
  id: int,
  title: string,
  completed: bool,
}

type session = {todos: array<todo>}

type status<'a> =
  | NotLoaded
  | Loading
  | Loaded('a)
  | FailedToLoad(string)

type page = Home({session: session, todos: status<array<todo>>})

type state = {page: page}

type msg =
  | GetTodos
  | GotTodos(array<todo>)
  | GotErrorNotTodos(string)

@scope("JSON") external parseTodoResponse: string => array<todo> = "parse"

let getTodos = () => {
  //   Tea.Http.request({
  //     method: "GET",
  //     headers: list{
  //       Header("Content-type", "application/json"),
  //     },
  //     url: "https://jsonplaceholder.typicode.com/todos",
  //     body: Web.XMLHttpRequest.EmptyBody,
  //     // expect: Tea.Http.expectStringResponse(Decoders.wrapExpect(decoder)),
  //     expect: Http.Expect(Web.XMLHttpRequest.JsonResponseType, ),
  //     timeout: None,
  //     withCredentials: false,
  //   })

  Tea.Http.send(resp => {
    switch resp {
    | Ok(body) =>
      GotTodos(body->parseTodoResponse)
    | Error(err) =>
      let error = switch err {
      | BadUrl(string) => "Bad url " ++ string
      | Timeout => "Timeout"
      | NetworkError => "NetworkError"
      | Aborted => "Aborted"
      | BadStatus(_) => "BadStatus "
      | BadPayload(_, _) => "BadPayload "
      }
      GotErrorNotTodos(error)
    }
  }, Tea.Http.getString("https://jsonplaceholder.typicode.com/todos"))
}

let init = () => ({page: Home({session: {todos: []}, todos: NotLoaded})}, getTodos())

let update = (model, msg) =>
  switch model.page {
  | Home({session, _}) =>
    switch msg {
    | GetTodos => ({page: Home({session, todos: Loading})}, getTodos())
    | GotTodos(todos) => ({page: Home({session: {todos: todos}, todos: Loaded(todos)})}, Tea.Cmd.none)
    | GotErrorNotTodos(err) => ({page: Home({session, todos: FailedToLoad(err)})}, Tea.Cmd.none)
    }
  }

let viewButton = (title, msg) => {
  button(list{onClick(msg)}, list{text(title)})
}

let viewTodos = todos => {
  switch todos {
  | NotLoaded => span(list{}, list{"Not loaded yet"->text})
  | Loading => span(list{}, list{"Loading"->text})
  | Loaded(todos) =>
    ol(
      list{},
      todos->Js.Array2.map(todo => li(list{}, list{todo.title->text}))->Belt.List.fromArray,
    )
  | FailedToLoad(error) => span(list{}, list{error->text})
  }
}

let view = model =>
  switch model.page {
  | Home({todos}) => div(list{}, list{viewButton("Get todos", GetTodos), viewTodos(todos)})
  }

let main = Tea.App.standardProgram({
  init,
  subscriptions: _ => Tea.Sub.none,
  update,
  view,
})
