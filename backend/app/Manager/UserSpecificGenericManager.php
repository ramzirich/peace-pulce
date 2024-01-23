<?php

namespace App\Manager;
use App\Exceptions\ExceptionMessages;
use App\Interface\IGenericRepository;
use Illuminate\Support\Facades\Auth;

class UserSpecificGenericManager{
    private $obj;
    private $user;

    public function __construct($obj) {
        $this->obj = $obj;
        $this->user = Auth::user();
    }

    public function findById($id, $foreignKey, $with=[]) {
        try{
            $model = $this->obj->with($with)->find($id);
            if(!$model){
                return [];
            }
            if($model->$foreignKey != $this->user->id){
                return [];
            }
            return $model;
        }catch(\Exception $exception){
            return ExceptionMessages::Error($exception->getMessage());
        }      
    }

    public function getByColumn($foreignKey, $foreignKeyVale, $userKey, $with=[]) {
        try{
            $model = $this->obj->with($with) 
                                ->where($foreignKey, $foreignKeyVale)
                                ->where($userKey, $this->user->id)
                                ->first();
            if(!$model){
                return [];
            }
            return $model;
        }catch(\Exception $exception){
            return ExceptionMessages::Error($exception->getMessage());
        }      
    }
    public function getAllForCurrentUser($request = null, $with=[]){
        try{
            $query = $this->obj->query();
            $perPage = $request->query('perPage', $request['perPage']);
            $page = $request->query('page', $request['perPage']);
            $sortColumns = $request->query('sortColumns', []);
            
            if ($request) {
                $query->where($request->except(['perPage', 'page', 'sortColumns']));
            }

            if (!empty($with)) {
                $query->with($with); 
            }
            
            if (!empty($sortColumns)) {
                foreach ($sortColumns as $sortColumn) {
                    $columnName = $sortColumn['column'];
                    $sortOrder = isset($sortColumn['order']) ? $sortColumn['order'] : 'asc';

                    $columns = \Schema::getColumnListing($this->obj->getTable());
                    if (in_array($columnName, $columns)) {
                        $query->orderBy($columnName, $sortOrder);
                    } else {
                        throw new \InvalidArgumentException("Invalid column name: $columnName");
                    }
                }
            }
            $result = $query->paginate($perPage, ['*'], 'page', $page);         
            return $result->items();
        }catch(\Exception $exception){
            return ExceptionMessages::Error($exception->getMessage());
        }
    }

    public function createWithSpecificUser($request) {
        try{
            $data = $request->all();
            $user = auth()->user();
            $this->obj->fill($data);
            $this->obj->user()->associate($user->id);
            $this->obj->save();

            return response()->json([
                'status'=> 'success',
                'data'=> $this->obj
            ], 201);
        }catch(\Exception $exception){
            return ExceptionMessages::Error($exception->getMessage());
        }
    }

    public function updateForSpecificUser($request, $id, $foreignKey){
        try{
            $data  = $request->all();
            $updated_model= $this->findById($id, $foreignKey);
       
            if(!$updated_model){
                return ExceptionMessages::NotFound(class_basename($this->obj));
            }

            $updated_model->fill($data);
            $updated_model->save();

            return response()->json([
                'status'=> 'success',
                'data'=> $updated_model
            ]);
        }catch(\Exception $exception){
            return ExceptionMessages::Error($exception->getMessage());
        }
    }

    public function deleteForSpecificUser($id, $foreignKey){
        try{
            $model_toDelete= $this->findById($id, $foreignKey);
            if(!$model_toDelete){
                return ExceptionMessages::NotFound(class_basename($this->obj));
            }
            $model_toDelete->delete();
            return response()->json([
                'status'=> 'success',
                'message'=> class_basename($this->obj). " successfully deleted" 
            ]);
        }catch(\Exception $exception){
            return ExceptionMessages::Error($exception->getMessage());
        }
    }

    public function deleteForSpecificUserByColumn($foreignKey, $foreignKeyVale, $userKey){
        try{
            $model_toDelete= $this->getByColumn($foreignKey, $foreignKeyVale, $userKey) ;
            if(!$model_toDelete){
                return ExceptionMessages::NotFound(class_basename($this->obj));
            }
            $model_toDelete->delete();
            return response()->json([
                'status'=> 'success',
                'message'=> class_basename($this->obj). " successfully deleted" 
            ]);
        }catch(\Exception $exception){
            return ExceptionMessages::Error($exception->getMessage());
        }
    }

    public function massdeleteSpecificUser($foreignKey, $request,){
        try {
            $data  = $request->json('ids',[]);
            $existing_models =[];
            foreach($data as $id){
                $model = $this->findById($id, $foreignKey);
                if($model){
                    $existing_models[] = $model;
                }
            }
            if(empty($existing_models)){
                return ExceptionMessages::NotFound(class_basename($this->obj));
            }
    
            foreach($existing_models as $model){
                $model->delete();
            };
    
            return response()->json([
                'status' => 'success',
                'message' => class_basename($this->obj) . "s successfully deleted"
            ]);
        } catch (\Exception $exception) {
            return ExceptionMessages::Error($exception->getMessage());
        }
    }


}