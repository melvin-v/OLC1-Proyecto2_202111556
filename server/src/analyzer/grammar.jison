%{
    // Importations
    import { type, arithmeticOperator, relationalOperator } from "./tools/Type.js";
    import { Declare } from './instrucciones/Declare.js';
    import { Set } from './instrucciones/Set.js';
    import { Aritmetica } from './expresiones/Aritmetica.js';
    import { Relacional } from './expresiones/Relacional.js';
    import { Primitivo } from './expresiones/Primitivo.js';
    import { Identificador } from './expresiones/Identificador.js';
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
","                 return 'TK_COMA'

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

\"[a-zA-Z0-9 ]*\"           return 'TK_VALUE_VARCHAR'
true|false                  return 'TK_VALUE_BOOLVAL'
[0-9]+\b                    return 'TK__VALUE_ENTERO';
[0-9]+("."[0-9]+)\b             return 'TK_VALUE_DOUBLE';
[a-zA-Z][a-zA-Z0-9_]*        return 'TK_IDENTIFIER';
"@"[a-zA-Z][a-zA-Z0-9_]*        return 'TK_ARROBA_IDENTIFIER';
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

%nonassoc 'TK_IGUAL' 'TK_DIF' 'TK_MENOR' 'TK_MENORIGUAL' 'TK_MAYOR' 'TK_MAYORIGUAL'
%left 'TK_PLUS' 'TK_MINUS'
%left 'TK_MULT' 'TK_DIV' 'TK_MOD'

/*------------------------ Grammar Definition ------------------------*/

%start ini

%%

ini : instructions EOF                                              { return $1; }
;

instructions : instructions instruction                             { $1.push($2); $$ = $1; }
        | instruction                                          { $$ = $1 === null ? [] : [$1]; }
;

instruction : declaraciones TK_PUNTOCOMA                             { $$ = $1; }
    | set TK_PUNTOCOMA                                               { $$ = $1; }
    | error TK_PUNTOCOMA                                    { errors.push(`Sintactic error ${yytext} in [${this._$.first_line}, ${this._$.first_column}]`); $$ = null; }
;

// ----------Declaración y asignación de variables----------
declaraciones : declaraciones TK_COMA declaracion
    | declaracion
;
declaracion: TK_DECLARE declaracion_default
    | TK_DECLARE declaracion_no_default
;

declaracion_default : expression TK_INT { $$ = new Declare($1, type.INT); }
    | expression TK_DOUBLE { $$ = new Declare($1, type.DOUBLE); }
    | expression_IDENTIFIER TK_DATE { $$ = new Declare($1, type.DATE); }
    | expression TK_VARCHAR  { $$ = new Declare($1, type.VARCHAR); }
    | expression TK_BOOL { $$ = new Declare($1, type.BOOL); }
;

declaracion_no_default : expression TK_INT TK_DEFAULT TK__VALUE_ENTERO { $$ = new Declare($1, type.INT, $5); }
    | expression TK_DOUBLE TK_DEFAULT TK_VALUE_DOUBLE { $$ = new Declare($1, type.DOUBLE, $5); }
    | expression TK_DATE TK_DEFAULT TK_DATE { $$ = new Declare($1, type.DATE, $5); }
    | expression TK_VARCHAR TK_DEFAULT TK_VALUE_VARCHAR { $$ = new Declare($1, type.VARCHAR, $5); }
    | expression TK_BOOL TK_DEFAULT TK_VALUE_BOOLVAL { $$ = new Declare($1, type.BOOL, $5); }
;

// ------------------   SET   -----------------------
set : TK_SET TK_ARROBA_IDENTIFIER TK_IGUAL expression { $$ = new Set($2, $4); }
;

// ------------------   EXPRESIONES   -----------------------
expression :     expression TK_PLUS expression                              { $$ = new Aritmetica($1, $3, arithmeticOperator.PLUS, @1.first_line, @1.first_column); }
               | expression TK_MINUS expression                         { $$ = new Aritmetica($1, $3, arithmeticOperator.MINUS, @1.first_line, @1.first_column); }
               | expression TK_MULT expression                          { $$ = new Aritmetica($1, $3, arithmeticOperator.MULT, @1.first_line, @1.first_column); }
               | expression TK_DIV expression                           { $$ = new Aritmetica($1, $3, arithmeticOperator.DIV, @1.first_line, @1.first_column); }
               | expression TK_IGUAL expression                            { $$ = new Relacional($1, $3, relationalOperator.IGUAL, @1.first_line, @1.first_column); }
               | expression TK_DIF expression                           { $$ = new Relacional($1, $3, relationalOperator.DIF, @1.first_line, @1.first_column); }
               | expression TK_MENORIGUAL expression                           { $$ = new Relacional($1, $3, relationalOperator.MENORIGUAL, @1.first_line, @1.first_column); }
               | expression TK_MAYORIGUAL expression                           { $$ = new Relacional($1, $3, relationalOperator.MAYORIGUAL, @1.first_line, @1.first_column); }
               | expression TK_MENOR expression                            { $$ = new Relacional($1, $3, relationalOperator.MENOR, @1.first_line, @1.first_column); }
               | expression TK_MAYOR expression                            { $$ = new Relacional($1, $3, relationalOperator.MAYOR, @1.first_line, @1.first_column); }
               | TK_ARROBA_IDENTIFIER                                             { $$ = new Identificador($1, @1.first_line, @1.first_column); }
               | TK_VARCHAR                                                 { $$ = new Primitivo($1, type.STRING, @1.first_line, @1.first_column); }
               | TK_INT                                                { $$ = new Primitivo($1, type.INT, @1.first_line, @1.first_column); }
               | TK_TRUE                                                   { $$ = new Primitivo($1, type.BOOLEAN, @1.first_line, @1.first_column); }
               | TK_FALSE                                                  { $$ = new Primitivo($1, type.BOOLEAN, @1.first_line, @1.first_column); }
               | TK_DOUBLE                                                 { $$ = new Primitivo($1, type.DOUBLE, @1.first_line, @1.first_column); }
               | TK_DATE                                                   { $$ = new Primitivo($1, type.DATE, @1.first_line, @1.first_column); }
               | TK_NULL                                                   { $$ = new Primitivo($1, type.NULL, @1.first_line, @1.first_column); }
               | TK_PARIZQ expression TK_PARDER                    { $$ = $2; }
;