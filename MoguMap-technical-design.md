# MoguMap 技術設計書

## 1. 現在の技術構成

### 実行環境

- Windows 11
- WSL2 Ubuntu
- Node.js 20.19.2
- npm 11.12.1

### フロントエンド

- Next.js 16.2.10
- React 19.2.4
- TypeScript 5系
- App Router
- CSS Modules
- ESLint 9系

## 2. モノレポ構成

npm workspacesを使用する。

    mogumap/
    ├── apps/
    │   └── web/          # Next.jsフロントエンド
    ├── packages/         # 将来、共通処理などを配置
    ├── package.json
    └── package-lock.json

ルートのworkspaces対象は次のとおり。

    apps/*
    packages/*

現在、実装済みのアプリは`apps/web`のみとする。

## 3. Next.jsの構成

`apps/web/src/app`を使用するApp Router構成とする。

現在の主なファイルは次のとおり。

    apps/web/src/app/
    ├── globals.css
    ├── layout.tsx
    ├── page.module.css
    └── page.tsx

- `layout.tsx`：すべての画面に共通する外枠
- `page.tsx`：現在のトップページ
- `globals.css`：アプリ全体へ適用するCSS
- `page.module.css`：トップページ専用のCSS

## 4. 外部APIとの通信方針

ホットペッパーグルメAPIのAPIキーをブラウザへ渡さない。

予定する基本的な流れは次のとおり。

    利用者
    ↓
    ブラウザ上のMoguMap画面
    ↓
    MoguMapのサーバー側API
    ↓
    ホットペッパーグルメAPI
    ↓
    MoguMapのサーバー側API
    ↓
    ブラウザへ必要な結果だけ返す

ブラウザからホットペッパーグルメAPIを直接呼び出さない。

サーバー側APIを次のどちらで実装するかは、まだ決定していない。

- Next.jsのRoute Handler
- 別アプリとして作るExpress API

決定するまでは、Expressなどの未導入パッケージを追加しない。

## 5. 入力とエラーへの対応方針

- ブラウザ側だけでなく、サーバー側でも検索条件を検証する
- 検索結果が0件の場合を通常の結果として扱う
- 外部APIの通信失敗と、検索結果0件を分けて扱う
- 外部APIから受け取ったデータを、そのまま無条件で信用しない
- エラー画面やログへAPIキーを出さない

具体的な入力条件とエラー表示は、実装前に決定記録へ残す。

## 6. 実行コマンド

開発サーバー：

    npm run dev --workspace=web

本番用ビルド：

    npm run build --workspace=web

Lint：

    npm run lint --workspace=web

本番用サーバー：

    npm run start --workspace=web

## 7. PostCSSの暫定対応

Next.js 16.2.10は、依存関係としてPostCSS 8.4.31を指定している。

PostCSSの脆弱性`GHSA-qx2v-qp2m-jg93`へ対応するため、ルート`package.json`で次のoverrideを設定している。

    "overrides": {
      "postcss": "^8.5.10"
    }

現在インストールされているPostCSSは8.5.18。

このため、`npm ls postcss`ではNext.jsの指定と一致せず、`invalid`および`ELSPROBLEMS`が表示される。

一方、次の確認は成功している。

- `npm audit`：脆弱性0件
- Webアプリのbuild
- Webアプリのlint
- Webアプリの開発サーバー起動
- `GET /`：200
- `npm ci --dry-run --ignore-scripts`

Next.jsがPostCSS 8.5.10以上へ正式対応した後、overrideを外せるか再確認する。

`npm audit fix --force`は、Next.jsを意図せず古い版へ変更する可能性があるため実行しない。

## 8. 未決定事項

- サーバー側APIをNext.jsとExpressのどちらで実装するか
- 検索画面、結果一覧、店舗詳細のURL
- 検索条件をURLへ持たせる方法
- ホットペッパーグルメAPIのレスポンスを受け取る型
- 環境変数の具体的な名前
- テスト方法
- デプロイ先
- DB、認証、Docker、AWSを最初の完成範囲へ含めるか
