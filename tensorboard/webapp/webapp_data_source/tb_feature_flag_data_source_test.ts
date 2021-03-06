/* Copyright 2020 The TensorFlow Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
==============================================================================*/
import {TestBed} from '@angular/core/testing';

import {
  QueryParamsFeatureFlagDataSource,
  TEST_ONLY,
} from './tb_feature_flag_data_source';

describe('tb_feature_flag_data_source', () => {
  describe('QueryParamsFeatureFlagDataSource', () => {
    let dataSource: QueryParamsFeatureFlagDataSource;
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        providers: [QueryParamsFeatureFlagDataSource],
      }).compileComponents();

      dataSource = TestBed.get(QueryParamsFeatureFlagDataSource);
    });

    describe('getFeatures', () => {
      it('returns enabledExperimentalPlugins from the query params', () => {
        spyOn(TEST_ONLY.util, 'getParams').and.returnValue(
          new URLSearchParams('experimentalPlugin=a&experimentalPlugin=b')
        );
        expect(dataSource.getFeatures()).toEqual({
          enabledExperimentalPlugins: ['a', 'b'],
        });
      });

      it('returns empty enabledExperimentalPlugins when empty', () => {
        spyOn(TEST_ONLY.util, 'getParams').and.returnValue(
          new URLSearchParams('')
        );
        expect(dataSource.getFeatures()).toEqual({
          enabledExperimentalPlugins: [],
        });
      });
    });
  });
});
