---
layout: post
title: "Recommender System"
date: 2024-10-31 00:00:00 +0900
categories: ML
---

# **추천시스템**
<br>
사용자의 **선호도**와 **과거 행동**을 바탕으로 상품, 콘텐츠, 서비스 등을 **개인 맞춤형**으로 추천하는 기술 
<br>

추천시스템은 크게 세 가지 방식으로 작동된다. 
1. **협업 필터링** (Collaborative Filtering)
2. **콘텐츠 기반 필터링** (Content-Based Filtering)
3. **하이브리드 방식** (Hybrid Method)

<br>

## **협업 필터링** &nbsp; Collaborative Filtering
### **Memory-Based**
사용자나 아이템 간의 유사도를 계산하여 유사도가 높은 이웃을 데이터를 통해 추천하는 방식이다. <br>
방식에 따라 user-based 또는 item-based 로 나뉜다. 
<br>
#### **User-Based**
**사용자 기반 협업 필터링**
비슷한 행동이나 선호도를 가진 사용자 그룹을 찾아, 그 그룹이 좋아하는 아이템을 추천한다.
1. 사용자 간 유사도 계산
2. 특정 사용자가 평가하지 않은 아이템 중 유사한 사용자가 선호하는 아이템을 추천한다.

장점
: - 추천 결과의 다양성
  - 계산 비용이 적다.

단점
: - cold start
  - 확장성이 떨어진다. (매번 유사도 계산 &rarr; 연산 비용 증가)

<br>

#### **Item-Based**
**아이템 기반 협업 필터링**
사용자가 선호했던 아이템과 비슷한 다른 아이템을 추천한다. 
1. 아이템 간 유사도 계산
2. 사용자가 선호한 아이템과 유사한 아이템 추천

장점
: - user-based 보다 스케일 확장이 쉽다. (유사도 계산을 미리 해둘 수 있다.)
  - 계산 비용이 적다. 
  - 추천 결과의 일관성이 높다.

단점
: - 새로운 아이템에 대한 데이터가 부족하면 추천이 어렵다. 

<br>

### **Matrix Factorization**
행렬 분해 기반 협업 필터링은 사용자-아이템 매트릭스를 수학적으로 분해하여 숨겨진 요인(Latent Factors)을 학습하고 이를 통해 추천을 수행한다. 

<br>

### **협업 필터링의 한계**
1. Cold Start
: 새로운 사용자나 아이템에 대한 데이터가 없으면 추천 어려울 수 있다.
2. 데이터 희소성 (Sparsity)
: 유저-아이템 매트릭스의 데이터가 부족하면 유사도 계산이 정확하지 않을 수 있다.
3. 확장성 문제
: 데이터가 증가할수록 계산량이 늘어나 성능이 저하된다.

<br>

---------


## **콘텐츠 기반 필터링** &nbsp; Content-Based Filtering
사용자가 과거에 선호했던 아이템의 속성을 분석하여 유사한 속성을 가진 아이템을 추천하는 방식이다.

1. 아이템의 메타데이터(속성) 분석
2. 사용자가 선호한 아이템의 속성을 학습하여 프로필을 생성
3. 이 프로필과 유사한 속성을 가진 다른 아이템 추천

장점
: - Cold Start 문제 해결: 새로운 사용자에 대해 초기 아이템 정보를 바탕으로 빠르게 추천 가능.
  - 개인 맞춤화: 사용자의 선호도를 반영하여 정확한 추천 제공.
  - 협업 필터링에 비해 데이터 희소성 문제가 적음.

단점
: - 사용자 프로필 제한: 사용자의 과거 행동 데이터가 부족하면 추천 품질 저하.
  - 과적합: 사용자가 선호했던 아이템과 비슷한 아이템만 추천.
  - 다양성 부족: 새로운 카테고리나 속성을 가진 아이템을 추천하기 어려움.

<br>

---------

## **하이브리드 방식** &nbsp; Hybrid Method
하이브리드 추천 시스템은 협업 필터링과 콘텐츠 기반 필터링의 장점을 결합하여 추천 품질을 향상시키는 방법이다.

대표적인 방법
: - 협업 필터링과 콘텐츠 기반 필터링의 점수(weighted score)를 조합.
  - 모델 기반 협업 필터링과 콘텐츠 기반 필터링을 병렬로 실행 후 결과 통합.
  - 협업 필터링의 결과를 콘텐츠 기반 필터링에 입력으로 사용.

장점
: - 단일 방법의 한계를 보완.
  - Cold Start 문제를 부분적으로 해결.
  - 다양한 데이터 유형을 활용 가능.

단점
: - 복잡한 시스템 구현이 필요.
  - 계산 비용과 모델 학습 시간이 증가.