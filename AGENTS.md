# 737-800勉強

## 対象と正本

- ローカル作業ルート：`D:\アプリ開発\737-800勉強`。既存の学習アプリ名は737 Study Finder。
- 学習モードは筆記試験（既存のStudy Finder）と口頭試験。口頭は評価シートREV-3の索引化・マニュアル待ちで、まだ問題・回答を作成していない。
- 申し送り：`D:\Dropbox\Obsidian\1.Application\Projects\737 Study Finder.md`。
- このディレクトリの`README.md`、`scripts\README.md`と、アカウント共通ルールを読む。
- 筆記画面・GASソースは`gas\`、Pages専用のトップ・モード切替・口頭準備画面は`web\`、専用スクリプトは`scripts\`、画像は`assets\answer-figures\`。
- Google側のフォルダ・GAS・Sheetはローカル移動前と同じ。`.clasp.json`を保持し、対象を確認してから操作する。

## データを守る条件

- 公開運用データの正本はGoogle SheetsのStudy737_DB。ローカルCSVは派生データ。
- 問題の区切り・質問内容は標準問題集、回答・略語の正式名称／Location／機能はSGで裏取りする。
- 質問ID、質問、回答、候補ページ、画像の対応と因果関係を維持する。生成し直すだけで既存データを上書きしない。
- Sheetで直接修正されたデータを巻き戻さない。再生成前に対象ATAをSheet exportから同期・検証する。
- SG／標準問題集PDF、CSV、認証情報、ローカル設定はGitHubやPagesに公開しない。
- 回答は本回答として表示する。DRAFT ANSWERや回答変更用Promptを再導入しない。
- 略語はATAをまたいで参照できるが、異なる定義を曖昧なまま自動リンクしない。
- 口頭の正本は`標準問題集\737-800 評価シート (REV-3).pdf`。`data\oral\`の索引は原文・親照査項目・LEVEL変更・条件・REF・元PDFページを保持するローカル専用データ。マニュアル照合前に回答を作らず、既存筆記データへ混ぜない。

## Git・公開の移行状態（2026-10-04）

- このルートに独立した`.git`がある。GitHubは`nikoneco/Study_Finder`、公開PWAは`https://nikoneco.github.io/Study_Finder/`。
- Git操作はこのルートで行う。従来の履歴は趣味HUBに保持し、新リポジトリは移行時スナップショットから開始する。
- 旧`D:\アプリ開発\趣味HUB\737_Study_Finder`と旧`scripts`の移行用ジャンクションは公開確認後に除去済み。コード・教材・データの実体はこのルートに保持する。
- スクリプトはこのリポジトリの`scripts/`で追跡する。
- Pages生成定義・生成先はこのルートの`tools\build-pages.js`・`docs\`。生成物を恒久修正先にしない。
- Pagesは`main`の`/docs`から公開。push前に再ビルド・`tools\check-project.js`を実行する。Actionsでも生成物との一致を検証する。
- manifest/SWのscopeは`/Study_Finder/`。キャッシュ削除はアプリ固有prefixに限定し、趣味HUB等のキャッシュを消さない。
- GAS公開、Sheet更新、GitHubへのpush、Pages公開は別工程。今回の分離ではGoogle側を変更しない。
- 趣味HUBの旧入口は新PWAをiframeで表示する中継ページ。GAS直表示版用の旧画像URLはHUB側で維持する。
- このプロジェクトは趣味HUB本体やLifeBoardを担当しない。親リポジトリの無関係な変更を保持する。
- Pagesトップは試験選択、`#written`は既存筆記、`#oral`は口頭準備。同じDOMの表示切替で筆記状態を保持する。Google/GAS直表示版のトップは今回変更していない。

## ローカル検証

```powershell
# 新ルートで実行
node scripts\validate_study_data.js
python scripts\validate_question_extractor.py "標準問題集\737-800標準問題集(2012.03.13).pdf" --data-dir data

node tools\build-pages.js
node tools\check-project.js
python -X utf8 scripts\prepare_oral_assessment.py
python -X utf8 scripts\test_oral_assessment.py
```

GAS操作の作業ディレクトリはこのルート、`rootDir`は`gas`。親の趣味HUB用`.clasp.json`と混同しない。
