%%raw(`import '@vanillawc/wc-datepicker'`)

open Tea.Html

type user = {
  name: string,
  email: string,
}

type todo = {
  userId: int,
  id: int,
  title: string,
  completed: bool,
}

type session = {
  todos: array<todo>,
  user: user,
}

type status<'a> =
  | NotLoaded
  | Loading
  | Loaded('a)
  | FailedToLoad(string)

type page =
  | Home({session: session, todos: status<array<todo>>})
  | Me({session: session})
  | NotFound({session: session, url: string})

type state = {page: page}

type msg =
  | UrlChanged(string)
  | GetTodos
  | GotTodos(array<todo>)
  | GotErrorNotTodos(string)
  | CustomClicked
  | DateSelected(string)

@scope("JSON") external parseTodoResponse: string => array<todo> = "parse"

let getTodos = () => {
  Tea.Http.send(resp => {
    switch resp {
    | Ok(body) => GotTodos(body->parseTodoResponse)
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

let update = (model, msg) => {
  let session = switch model.page {
  | Home({session}) => session
  | Me({session}) => session
  | NotFound({session}) => session
  }

  switch msg {
  | UrlChanged(hash) =>
    Js.Console.log(hash)
    switch hash {
    // | "" => (0, Navigation.modifyUrl(toUrl(0)))
    | "" => ({page: Home({session, todos: Loading})}, getTodos())
    | "#todos" => ({page: Home({session, todos: Loading})}, getTodos())
    | "#me" => ({page: Me({session: session})}, Tea.Cmd.none)
    | unknownUrl => ({page: NotFound({session, url: unknownUrl})}, Tea.Cmd.none)
    }
  | GetTodos => ({page: Home({session, todos: Loading})}, getTodos())
  | GotTodos(todos) => (
      {page: Home({session: {...session, todos}, todos: Loaded(todos)})},
      Tea.Cmd.none,
    )
  | GotErrorNotTodos(err) => ({page: Home({session, todos: FailedToLoad(err)})}, Tea.Cmd.none)
  | CustomClicked =>
    Js.Console.log("custom click occurred")
    (model, Tea.Cmd.none)
  | DateSelected(date) =>
    Js.Console.log(`date ${date} selected`)
    (model, Tea.Cmd.none)
  }
}

let viewNavLinks = () => {
  nav(
    list{},
    list{
      ul(
        list{},
        list{
          li(list{}, list{a(list{href("#todos")}, list{"Todos"->text})}),
          li(list{}, list{a(list{href("#me")}, list{"About me"->text})}),
        },
      ),
    },
  )
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
  | Home({todos}) =>
    div(
      list{},
      list{
        node("word-count", list{onMsg("customClicked", CustomClicked)}, list{}),
        node(
          "wc-datepicker",
          list{},
          list{
            input'(
              list{
                type'("text"),
                onCB("dateselect", "", ev => {
                  switch ev["target"]->Js.Undefined.toOption {
                  | Some(target) =>
                    switch target["value"]->Js.Undefined.toOption {
                    | Some(date) => Some(DateSelected(date))
                    | None => None
                    }
                  | None => None
                  }
                }),
              },
              list{},
            ),
          },
        ),
        viewNavLinks(),
        viewButton("Get todos", GetTodos),
        viewTodos(todos),
      },
    )
  | NotFound({url}) => p(list{}, list{viewNavLinks(), `Page ${url} does not exist!`->text})
  | Me({session}) => p(list{}, list{viewNavLinks(), session.user.name->text})
  }

let locationToMsg = location => {
  open Web.Location
  UrlChanged(location.hash)
}

let init = ((), location) => {
  let user = {
    name: "Jayesh Bhoot",
    email: "jb@fakemail.com",
  }
  let session = {
    user,
    todos: [],
  }
  open Web.Location
  switch location.hash {
  // | "" => (0, Navigation.modifyUrl(toUrl(0)))
  | "" => ({page: Home({session, todos: NotLoaded})}, getTodos())
  | "#todos" => ({page: Home({session, todos: NotLoaded})}, getTodos())
  | "#me" => ({page: Me({session: session})}, Tea.Cmd.none)
  | unknownUrl => ({page: NotFound({session, url: unknownUrl})}, Tea.Cmd.none)
  }
}

let main = Tea.Navigation.navigationProgram(
  locationToMsg,
  {
    init,
    subscriptions: _ => Tea.Sub.none,
    update,
    view,
    shutdown: _ => Tea.Cmd.none,
  },
)
