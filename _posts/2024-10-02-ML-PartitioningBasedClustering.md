---
layout: post
title: "[ML] Partitioning-Based Clustering"
date: 2024-10-02 12:00:00 +0900
categories: Machine_Learning
use_math: true
---

## **Clustering**


클러스터링 알고리즘
classification 은 지도학습. supervised. 
클러스터링은 비지도학습. 클래스가 주어지지 않음. unsupervised. 

k-means 는 partitioning-based
expectation maximization 은 partitioning 과 비슷
k-means 를 제일 많이 쓰는데 그만큼 쓰는게 em (expect.. max..)
em 은 클러스터 객체의 분포가 가우스를 따를 것이다 하는 가정 . normal
DBSCAN 은 밀도 기반. 

k-means, k-modes, k-medoids.. 
모두 k가 있는데 이건 클러스터의 개수. 
클러스터 구성의 기본 원칙은 같은 클러스터에는 유사한 object 가 모이고 다른 클러스터끼리는 유사도가 낮음. (거리와 유사도는 반대되는 개념.)

k-means 는 mean 을 사용하는데 그 값을 실제로 없는 새로 생긴 값일 수도 있음. 
k-medoids 는 평균이 아니라 중앙값을 사용함. 

### k-means algorithm

1. random 한 k 개의 object 를 정함. 
2. k 개의 object 를 centroids 로 하는 클러스터를 구성함. 
3. k 개의 클러스터가 만들어지면 그 클러스터의 새로운 centroid 를 만듦. 
4. 새로운 centroids 로 새로 클러스터를 구성
5. 위 과정을 계속 반복. (클러스터의 변경이 없어지거나 정해진 횟수까지 반복.)

k-means 장점
: O(tkn) -> 이정도면 빠름. 
단점
: mean 이 구해지지 않는 경우에는 사용할 수 없음 (categorical 같은)
noise 와 outlier 에 민감함. (평균을 구하기 때문에)
k 를 찾는게 중요. (차원이 크면 찾기가 너무 어려움)
초기 k 를 어떻게 설정하는냐에 따라 클러스터의 결과가 달라질 수 있음. 

거리를 측정하는 방법
: 맨해튼, 유클리드

각 center 와 가까운 object 를 다 찾고 그 center 는 바뀔 확률이 높음. 
그렇게 하지 않고 object 를 모으면서 center 를 바꿔도 됨. 그러면 좀 더 정확할 수 있음. 


### K-modes

means 대신 modes 를 사용. 
modes 는 가장 많이 나오는 값을 의미함. 
각 columns 별로 가장 많이 나오는 값을 모은게 mode vector
mode vector 를 클러스터의 center 로 사용. 

거리를 측정할 때는 hamming distance 사용. 
column 중에 몇개가 다른지. 

step
1. k 의 object 를 구함. (초기 mode vector, center)
2. 다른 object 들과 mode vector 간의 hamming 측정해서 cluster 구석
3. cluster 안의 새로운 mode vector 를 구함. 
4. 위 과정 반복 .

distance to a cluster center
두개가 다르면 1
두개가 같으면 그 값이 전체중에 몇개 있는지 찾아서 1-nj/nl

K-modes Objective function (Cost function)
: k-means 와 비슷. 뒤에 sum 두개는 클러스터 내에 object 간의 거리. 앞에 sum 은 모든 클러스터끼리의 거리.

### K-medoids
cluster 내에 있는 object 로만 center 를 설정. 

**PAM**


k-medoids 의 성능을 올리기위해 랜덤한 object 를 medoid 로 정해보고 성능 비교. 

swapping. 
medoid 랑 아닌거랑 다 swapping 해보면서 더 나아졌는지 확인. (error function 을 계산해서)
데이터가 많을 수록 이 과정의 cost 가 급격히 증가 

40p hw 은 안해도 됨. 

pam 은 outlier 에 강함. 
kaggle 에 있는 데이터는 이미 정제가 잘 된 데이터. 
실제로는 outlier 도 엄청 많고 dirty 함. 

근데 Order 가 너무 큼. 
O(k(n-k)^{2})
n의 제곱꼴이기 때문에 큰 데이터에는 이 알고리즘을 쓸 수 없음. 
이런 단점을 보완한게 CLARA , CLARANS

42p hw 도 패스

### CLARA

데이터 개수가 많으면 샘플을 추출함. 여기서 샘플은 한 object 가 아니라 object 의 집합임. 여러개. 

clara 의 단점. 
샘플링이 중요. 샘플의 퀄리티에 따라 클러스터 결과가 좌지우지됨. 

### CLARANS

k 개의 medoids 를 모은 것을 하나의 노드로 봄. 
이중에서 임의의 것을 swapping 하는데 ..
k 개의 medoids 중 하나를 medoid 가 아닌 것으로 swapping
하나만 다른게 neighbor 라고 함. 

clarans 는 더 공부해봐야겠다. . . . 

pam 은 다 해봐야되는데
이거는 maxNeighbors 만큼만 함. 
좋아지면 take. 아니면 pass. 
take 해서 바꿔지면 그때부터 maxNeighbors 다시 시작. 

clarans vs pam
큰 데이터에서는 clarans 가 유리
작은 데이터에서도 clarans 가 더 성능이 좋음

clarans vs clara
clarans 는 loop 을 두번 돌기때문에 결과가 더 좋은 경우가 있음. 
loop 을 두번 돌기 때문에 더 오래걸림. 
parameter 조정해서 시간을 조절해 clara 랑 비슷한 시간으로 만들면 성능은 더 좋음. 

54p hw 는 해야됨. 
chatgpt, perplexity, claude 다 써도 됨. 
쓰는건 좋은데 복붙하지 말고 왜 그런지 알아야함. 틀린 답을 줄 수도 있음. 
처음 시작하는데에는 매우 도움이 됨. 
잘써야 도움이 됨. 
