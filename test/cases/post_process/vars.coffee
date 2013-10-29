{
  greeting: 'Hello'
  postProcess: (s) -> (c for c in s by -1).join ''
}