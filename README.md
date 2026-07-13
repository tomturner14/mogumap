# MoguMap

MoguMapは、ホットペッパーグルメAPIを利用して飲食店を検索するWebアプリです。

現在は、モノレポとNext.jsフロントエンドの初期構築を進めています。

## 最初の完成範囲

- 千葉県内の飲食店を対象にする
- ホットペッパーグルメの中エリア単位で検索する
- 店名や料理名などのキーワードで検索する
- 検索結果一覧と店舗詳細を表示する

## 現在の構成

```text
mogumap/
├── apps/
│   └── web/       # Next.jsフロントエンド
├── packages/      # 将来、共通処理などを配置
├── package.json
└── package-lock.json

```

## 開発環境

- Node.js 20.19.2
- npm 11.12.1
- Next.js 16.2.10
- React 19.2.4
- TypeScript

## セットアップ

依存関係をインストールします。

```bash
npm install
```

Next.jsの開発サーバーを起動します。

```bash
npm run dev --workspace=web
```

起動後、ブラウザで次を開きます。

```text
http://localhost:3000
```

## セキュリティ

ホットペッパーグルメAPIのAPIキーはブラウザへ渡さず、Gitにも保存しません。
