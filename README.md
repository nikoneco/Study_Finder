# 737-800勉強

737-800資格勉強のためのプロジェクト。現在の737 Study Finderは筆記照査用のPWAで、標準問題集のATA別・ランダム出題、SGを根拠にした回答、関連図、略語辞書を提供する。

- 作業ルート：`D:\アプリ開発\737-800勉強`
- [公開PWA](https://nikoneco.github.io/Study_Finder/)
- [GitHub](https://github.com/nikoneco/Study_Finder)
- Google側の保存先・GAS・Sheetは従来どおり。管理先はローカル設定とObsidianの申し送りで確認する。
- 申し送り：`D:\Dropbox\Obsidian\1.Application\Projects\737 Study Finder.md`

## 構成

| 場所 | 役割 |
| --- | --- |
| `gas/` | GASバックエンドと画面ソース。claspのrootDir |
| `assets/answer-figures/` | 質問IDに紐付く回答図 |
| `scripts/` | PDF抽出、CSV同期・生成、質問境界・整合検証 |
| `tools/` | 独立したPages生成と公開構成の検証 |
| `docs/` | このリポジトリのPages生成物。直接編集しない |
| `data/` | ATA別の派生CSV。Git管理対象外 |
| `Study_Guide/`、`標準問題集/` | 根拠となるPDF。公開禁止 |
| `.clasp.json` | 既存GASへの接続設定。Git管理対象外 |
| `Codex 申し送り.txt` | 初期設計の履歴資料。現行仕様の正本ではない |

公開運用データの正本はGoogle SheetsのStudy737_DB。質問は標準問題集、回答・略語はSGで裏取りする。質問IDと回答・候補ページ・画像の対応を守り、Sheetで直接編集されたデータを古いCSVで上書きしない。

## 作業コマンド

以下は新ルートで実行する。生成・同期系の詳細は`scripts/README.md`を参照。

```powershell
node scripts\validate_study_data.js
python scripts\validate_question_extractor.py "標準問題集\737-800標準問題集(2012.03.13).pdf" --data-dir data
node tools\build-pages.js
node tools\check-project.js
```

`clasp`も新ルートで実行する。移動に伴うGAS・Drive・SheetのID変更や再デプロイは不要。

## GitHubとPages

2026-10-04にコード・教材・データ212ファイルと専用スクリプト33ファイルの実体をこのルートへ移動した。移動前後の全245ファイルのSHA-256一致を確認した後、スクリプトの参照パスを新ルートへ修正した。

このルートは独立したGitリポジトリで、`origin`は`nikoneco/Study_Finder`。新リポジトリの履歴は移行時の現行コードのスナップショットから開始する。従来の履歴は趣味HUBリポジトリに残る（Study Finderの画面・GASの移行元は`8cfb98f`）。

```powershell
git status --short
node tools\build-pages.js
node tools\check-project.js
# 確認後、変更対象だけcommit/pushする
```

Pagesは`main`ブランチの`/docs`から公開する。Actionsは再ビルド・公開構成・コミット済み生成物との一致を検証する。依存ライブラリのインストールは不要。

趣味HUBの旧入口`/hobby-hub/737-study-finder/`は新PWAをiframeで表示する中継ページになる。GAS直表示版が利用する旧回答画像URLも互換配信を維持する。

PWAのmanifestとService Workerのscopeは`/Study_Finder/`。キャッシュ削除は`study-finder-pwa-`だけに限定し、他の同一ドメインのPWAを巻き込まない。Google側へのコード反映・データ更新はGitHubへのpushとは別工程。
