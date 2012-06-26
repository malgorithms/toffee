//
//
// grammar file for Cojo Templating
//
//

%lex
%%

"{##"                     return 'START_COJO_COMMENT';
"##}"                     return 'END_COJO_COMMENT';
"{#"                      return 'START_COFFEE';
"#}"                      return 'END_COFFEE';
":"[\t\r\n ]*"{:"         return 'START_INDENTED_COJO'
"{:"                      return 'START_COJO';
":}"                      return 'END_COJO';
[^{}#\\:]+|[\\{}#:]       return 'CODE';
<<EOF>>                   return 'EOF';

/lex

%start starter

%%

starter 
  :
    cojo_zone EOF            { $$ = ["COJO_ZONE", $1]; return $$;}
  ;

cojo_zone 
  :
    cojo_code                                 { $$ = [$1]; }
  |
    cojo_code flip_to_coffee cojo_zone        { $$ = $3; $3.splice(0,0,$1,$2); }
  |
    flip_to_coffee cojo_zone                  { $$ = $2; $2.splice(0,0,$1); }
  |
    cojo_code flip_to__cojocomment cojo_zone  { $$ = $3; $3.splice(0,0,$1); }
  |
    flip_to__cojocomment cojo_zone            { $$ = $2; $2.splice(0,0,$1); }
  |
                                              { $$ = []; }
  ;

flip_to__cojocomment
  :
  START_COJO_COMMENT code END_COJO_COMMENT  {}
  ;

flip_to_coffee
  :
    START_COFFEE coffee_zone END_COFFEE  { $$ = ["COFFEE_ZONE", $2]; }
  ;

coffee_zone 
  :
    coffee_code                              { $$ = [$1]; }
  |
    coffee_code flip_to_cojo coffee_zone     { $$ = $3; $3.splice(0,0,$1,$2); }
  |
    flip_to_cojo coffee_zone                 { $$ = $2; $2.splice(0,0,$1); }
  |
                                             { $$ = []; }
  ;

flip_to_cojo
  :
    START_COJO cojo_zone END_COJO            { $$ = ["COJO_ZONE", $2]; }
  |
    START_INDENTED_COJO cojo_zone END_COJO   { $$ = ["INDENTED_COJO_ZONE", $2]; }
  ;


cojo_code
  :
  code                  { $$ = ["COJO", $1]; }
  ;

coffee_code
  :
  code                  { $$ = ["COFFEE", $1]; }
  ;


code
  :
    CODE                                 { $$ = $1; }
  |
    code CODE                            { $$ = $1 + $2; }
  ;
