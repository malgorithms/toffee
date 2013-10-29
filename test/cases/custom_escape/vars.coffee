{
  escape: (s) -> "#{s}".replace /[^a-z0-9]/gi, ''
}