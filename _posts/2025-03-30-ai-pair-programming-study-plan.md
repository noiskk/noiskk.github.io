---
layout: post
title: "[Study] AI Pair-Programming 기반 학습 로드맵"
date: 2025-03-30 12:00:00 +0900
categories: Study-Log
---

> GPT의 도움을 받아 코딩하는게 일상이 되어버렸다. <br>
> 내가 AI의 코딩실력을 이기는건 불가능해 보인다. <br>
> 이길 수 없다면 내 편으로 만들어야 한다! <br>
> Pair Programming (짝 프로그래밍) 이라는 개념을 들어본 적이 있다. <br>
> 두 명이 짝을 이뤄 서로의 코드를 리뷰해주며 개발하는 방법이다. <br>
> AI와 짝을 맺어 AI Pair-Programming 을 시작해 보려고한다. <br>

<br>

## 1 | AI Pair-Programming이란?

**LLM 기반 코딩 보조 도구**와 함께 마치 “짝 프로그래머”처럼 아이디어 회의·코딩·리팩터·테스트를 반복하는 개발 방식.

* **빠른 초안(90 % 완성)** 은 AI에게, **품질·설계·보안**은 사람이 검증·완성하는 하이브리드 흐름.

### ✔ 내가 기대하는 이점

1. **학습 속도 ↑** : 예제 자동 생성 → 핵심 로직·디버깅에 집중
2. **즉시 피드백** : “왜 이렇게 동작해?” 를 AI에게 즉시 묻고 실험 → 개념 정착
3. **문서화 습관** : AI가 만든 코드·답변을 블로그에 정리하며 *근거*까지 남김

<br>

---

<br>

## 2 | 로드맵 - 성장 플랜

| Phase                    | 기간       | 핵심 목표                                                                     | 산출물 & 검증                                         |
| ------------------------ | -------- | ------------------------------------------------------------------------- | ------------------------------------------------ |
| **① Java Core Boost**    | **10 주** | OOP, 컬렉션, 동시성, JVM, 최신 문법                                                 | **주 5 포스트** + Mini 프로젝트 3 개                      |
| **② Spring Deep‑Dive**   | **8 주**  | Spring Boot 심화, JPA, Spring Security JWT/OAuth2, 테스트, CI/CD               | *Todo REST → 팀원 모집 API* 서비스, Sonar Coverage 80 % |
| **③ DevOps & Project**   | **6 주**  | Docker, GitHub Actions, AWS EC2/RDS, Blue‑Green 배포                        | 실제 배포 URL + 사용자 로그 분석 리포트                        |
| **④ AI Plug‑in / MLOps** | **4 주**  | OpenAI API 연동, Prompt Engineering, FastAPI or Spring WebFlux 서빙, 모델 버전 관리 | “문의 자동 답변” 모듈 + MLOps 파이프라인 데모                   |
| **⑤ Interview Polish**   | **4 주**  | CS 정리, 시스템 설계 스터디, 모의 면접, 영어 OPIc IH                                      | LeetCode Top100, 모의 면접 5 회 피드백 글                 |

<br>

---

<br>

## 3 | AI 활용 루틴

1. **코드 초안**   : Copilot / ChatGPT “`// skeleton`” 프롬프트
2. **디버깅**       : StackTrace 붙여넣고 “원인 & 수정 PR 생성” 요청
3. **리팩터**       : “이 코드 가독성 ↑ & 테스트 추가” 요구
4. **리뷰 기록**    : PR Description에 *프롬프트/응답 요약* 첨부
5. **블로그 작성** : ▸ 개념 ▸ 왜? ▸ 코드 ▸ 회고(실험 결과) 4-단락 템플릿

<br>

---

<br>

## 4 | AI Pair‑Programming 운영 규칙

1. **Prompt Repository** : 효과 좋은 프롬프트 ↗ Markdown으로 기록 후 공유.
2. **AI 로그 투명화** : PR Body에 `<!-- AI‑Generated Section -->` 블록 삽입.
3. **주 1 회 No‑AI Day** : 플러그인 끄고 솔로 코딩—면접 근육 유지.
4. **회고 리추얼** : 일요일 저녁 ⋯ ‘좋았던 점 · 개선할 점 · 내주 목표’ 3 줄 요약.
