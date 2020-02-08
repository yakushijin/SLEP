/*============================================================================================================
各ページの表示テキスト及び色の設定
============================================================================================================*/

//--------------------<トップページ関連>--------------------
//各種表示テキスト及び色
const myname = "ほげ田ふが郎";
const myage = "10さい";
const myjobs = "ぴよぴよコーポレーションCEO";
const myfreetext = "多分動かないと思うけどリリースしようぜ";
const freetext = "";
const namecolor = "#05022b";
const agejobscolor = "#0a0458";
//ボタンの色
const topbuttontextcolor = "#b65c00";
const topbuttoncolor = "#e2ba29,#e2aa00";
const topbuttonbodercolor = "#cb7100";

//--------------------<リンク関連>--------------------
//アクセス情報
const protocol = window.location.protocol;
const host = $(location).attr("host");
const htmldir = "/html/";
const csvdir = "../text/";
const webaccess = protocol + "//"+ host + htmldir;
//各ページのファイル
const filetype = ".html";
const topfilename = "top";
const pjfilename = "pj";
const techfilename = "tech";
//リンク
const toplink = webaccess + topfilename + filetype;
const techlink = webaccess + techfilename + filetype;
const pjlink = webaccess + pjfilename + filetype;
//リンクの表示テキスト名
const toppagename = "トップ";
const techpagename = "取得技術";
const pjpagename = "PJ実績";

//--------------------<ヘッダー関連>--------------------
//ヘッダー各種色
const headerbackcolor = "#535397";
const headertextcolor = "#1b0d3b";
const headerchoicecolor = "#8eb0e0, #bcd9f4";

//--------------------<表示アイテム関連>--------------------
//表示アイテム各種色
const tabletextbuttoncolor = "#FFFFFF";
const tablebuttoncolor = "#1b0d3b";
const tablebuttonbodercolor = "#e98d2a";
const descusetextcolor = "#000000"; 
const descusebackcolor = "#d1df9d"; 

//--------------------<技術ページ関連>--------------------
//表内各表示テキスト及び色
const techsidetext = "開発/構築の知識と経験";
const pjsidetext = "保守の知識と経験";
const techcategoryselectcolor = "#d2e0fb";
const techlinetextcolor = "#000048";
const techtablebackcolor = "#7ED1E6";
//説明欄各表示テキスト及び色
const techname = "技術の名称";
const techdesc = "主な使用用途";
const techmyrange = "自分が主に対応可能な範囲";
const techdesclabelcolor = "#00008c";

//--------------------<PJページ関連>--------------------
//表内各表示テキスト及び色
const techverticaltext = "技術貢献割合";
const pjverticaltext = "マネジメント貢献割合";
const pjcategoryselectcolor = "#c3d9c0";
const pjlinetextcolor = "#2a3627";
const pjtablebackcolor = "#aad7aa";
//説明欄各表示テキスト及び色
const pjname = "PJ概要";
const pjbusiness = "商流";
const pjyears = "参画期間";
const pjusedtech = "主な使用技術";
const pjrole = "自分が主に担当した業務内容";
const pjdesclabelcolor = "#384436";

//--------------------<DB及び取り込み元ファイル関連>--------------------
//取り込み元csvファイル名※DBのテーブル名となる。
const categoryname = "category";
const techitemlistname = "techitemlist";
const pjitemlistname = "pjitemlist";
const rolelistname = "rolelist";
const rangelistname = "rangelist";
const pjtechmapname = "pjtechmap";
const pjrolemapname = "pjrolemap";
const techrangemapname = "techrangemap";
//「categoryname」の2カラム目の値（カテゴリセレクトボックスの初回生成で使用）
const techcategoryname = "tech";
const pjcategoryname = "pj";
//「techitemlistname」の2カラム目の値（初回遷移時にどのカテゴリを選択した状態で表示するか設定）
const techfirstselect = "develop";
//「pjitemlistname」の2カラム目の値（初回遷移時にどのカテゴリを選択した状態で表示するか設定）
const pjfirstselect = "devpj";

//--------------------<アニメーション関連>--------------------
//トップ画面のアニメーション表示有無
const anime = false;