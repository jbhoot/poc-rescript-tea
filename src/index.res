@send
external getElementById: (Dom.document, string) => Js.Nullable.t<Web.Node.t> = "getElementById"
@val external document: Dom.document = "document"

let _ = App.main(document->getElementById("root"), ())
