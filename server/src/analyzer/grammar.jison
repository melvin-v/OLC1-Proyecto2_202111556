%{
    // Importations
    import { type, arithmeticOperator, relationalOperator } from "./tools/Type.js";
    import { Declaracion } from './instrucciones/Declaracion.js';
%}

%{
    // Variables definition and functions

    let errors = [];

    const clean_errors = () => {
        errors = [];
    }
%}

%lex 
%options case-insensitive
%x string
%%

\s+                         // Spaces Ignored
"--".*                     // Comments Ignored
/\/\*.*\*\//

"BEGIN"            return 'TK_BEGIN'
"END"              return 'TK_END'
"DECLARE"          return 'TK_DECLARE'
"@"                return 'TK_ARROBA'
"DEFAULT"          return 'TK_DEFAULT'
"SET"              return 'TK_SET'

/*------------------------ DDL ------------------------*/
"CREATE"           return 'TK_CREATE'
"TABLE"            return 'TK_TABLE'
"ALTER"            return 'TK_ALTER'
"ADD"              return 'TK_ADD'
"DROP"             return 'TK_DROP'
"COLUMN"           return 'TK_COLUMN'
"RENAME"           return 'TK_RENAME'
"TO"               return 'TK_TO'

/*------------------------ DML ------------------------*/
"INSERT"           return 'TK_INSERT'
"INTO"             return 'TK_INTO'
"VALUES"           return 'TK_VALUES'
"SELECT"           return 'TK_SELECT'
"FROM"             return 'TK_FROM'
"WHERE"            return 'TK_WHERE'
"UPDATE"           return 'TK_UPDATE'
"TRUNCATE"         return 'TK_TRUNCATE'
"DELETE"           return 'TK_DELETE'
"CAST"             return 'TK_CAST'
"AS"               return 'TK_AS'

"int"               return 'TK_INT'
"double"            return 'TK_DOUBLE'
"date"              return 'TK_DATE'
"varchar"           return 'TK_VARCHAR'
"bool"              return 'TK_BOOL'
"null"              return 'TK_NULL'

"+"                 return 'TK_PLUS'
"-"                 return 'TK_MINUS'
"*"                 return 'TK_MULT'
"/"                 return 'TK_DIV'
"%"                 return 'TK_MOD'
"("                 return 'TK_PARIZQ'
")"                 return 'TK_PARDER'
";"                 return 'TK_PUNTOCOMA'

"="                 return 'TK_IGUAL'
"!="                return 'TK_DIF'
"<"                 return 'TK_MENOR'
"<="                return 'TK_MENORIGUAL'
">"                 return 'TK_MAYOR'
">="                return 'TK_MAYORIGUAL'

"AND"               return 'TK_AND'
"OR"                return 'TK_OR'
"NOT"               return 'TK_NOT'
"TRUE"              return 'TK_TRUE'
"FALSE"             return 'TK_FALSE'
"NULL"              return 'TK_NULL'

[ \r\t]+                    {}
\n                          {}

// \"[^\"]*\"                  { yytext = yytext.substr(1, yyleng-2); return 'STRING'; }

\"[a-zA-Z0-9 ]*\"           return 'TK_STRING'
true|false                  return 'TK_BOOLVAL'
'[a-zA-Z]'                  return 'TK_CHAR'
[0-9]+\b                    return 'TK_ENTERO';
[0-9]+("."[0-9]+)\b             return 'TK_DOUBLE';
[a-zA-Z][a-zA-Z0-9_]*        return 'IDENTIFIER';
(\d{4})-(\d{1,2})-(\d{1,2}) return 'TK_DATE';

["]                             {cadena="";this.begin("string");}
<string>[^"\\]+                 {cadena+=yytext;}
<string>"\\\""                  {cadena+="\"";}
<string>"\\n"                   {cadena+="\n";}
<string>"\\t"                   {cadena+="\t";}
<string>"\\\\"                  {cadena+="\\";}
<string>"\\\'"                  {cadena+="\'";}
<string>["]                     {yytext=cadena; this.popState(); return 'TK_VARCHAR';}

<<EOF>>                     return 'EOF';

.                           { console.log(`Lexical error ${yytext} in [${yylloc.first_line}, ${yylloc.first_column}]`); }

/lex

/*------------------------ Grammar Definition ------------------------*/

%start ini

%%

ini : instructions EOF                                              { return $1; }
;

instructions : instructions instruction                             { $1.push($2); $$ = $1; }
        | instruction                                          { $$ = $1 === null ? [] : [$1]; }
;

instruction : declaracion TK_PUNTOCOMA                             { $$ = $1; }
    | error TK_PUNTOCOMA                                    { errors.push(`Sintactic error ${yytext} in [${this._$.first_line}, ${this._$.first_column}]`); $$ = null; }
;

declaracion : TK_DECLARE TK_ARROBA TK_IDENTIFIER TK_INT TK_PUNTOCOMA { $$ = new Declaracion($3, type.INT); }
    | TK_DECLARE TK_ARROBA TK_IDENTIFIER TK_DOUBLE TK_PUNTOCOMA { $$ = new Declaracion($3, type.DOUBLE); }
    | TK_DECLARE TK_ARROBA TK_IDENTIFIER TK_DATE TK_PUNTOCOMA { $$ = new Declaracion($3, type.DATE); }
    | TK_DECLARE TK_ARROBA TK_IDENTIFIER TK_VARCHAR TK_PUNTOCOMA { $$ = new Declaracion($3, type.VARCHAR); }
    | TK_DECLARE TK_ARROBA TK_IDENTIFIER TK_BOOL TK_PUNTOCOMA { $$ = new Declaracion($3, type.BOOL); }
